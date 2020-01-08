import React from "react";
import { renderToString,renderToStaticMarkup } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";

import createStore, { initializeSession } from "../store";


import Helmet from "react-helmet";


/*****/
import cookieParser from "cookie-parser";
var bodyParser = require('body-parser');

import fetch from "isomorphic-fetch";

import bcrypt from "bcrypt-nodejs";

var QRCode = require('qrcode');
var speakeasy = require('speakeasy');

let emailPattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
let passwordPattern = new RegExp(/^[A-Za-z0-9\!\@\#\$\%\^\&\*]+$/);

const rippleAddress = 'rMBecsaHgLpoWTr28qBJ4jFD6aHDPTWoq6';

module.exports = function(app,redisapi){



/*Request users data from User-Data*/
app.post('/user/profile', function(req,res,next){


      if(req.isLoggedIn){

         redisapi.getUserEmail(req.sessionID,function(err,userEmail){

          if(userEmail){
            redisapi.getUserData(userEmail,function(err,userData){

              let newData = {}
              let requestedData = {}
              let reqType = ''

              if(userData){
                let data = JSON.parse(userData);

                //could do:
                //check req body for what data we need.
                //then format and send necessary data.

                if(req.body.name === 'wallet'){
                  console.log(data);
                  requestedData.name = 'wallet';
                  requestedData.destinationTag = data.destinationTag;
                  requestedData.balance = data.balances;
                  requestedData.escrow = data.escrow;
                  requestedData.address = rippleAddress;
                  requestedData.history = data.txHistory;


                  res.send(JSON.stringify(requestedData))
                }


                if(req.body.name === 'settings'){//TODO: modify the following to check for the type of request as we did with the wallet request above:

                  newData.name = data.name;
                  newData.email = data.email;
                  newData.twofa = data.twofa;
                  newData.apiKey = data.apiKey;

                  if(newData.twofa){

                    res.send(JSON.stringify(newData))
                  }else{

                    const secret = speakeasy.generateSecret({length: 20});

                    QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {

                      newData.twofaImgUrl = data_url;
                      newData.twofaSecret = secret.hex;
                      res.send(JSON.stringify(newData))
                    })
                  }
                }

              }else{
                next()
              }
            })
          }else{
            next()
          }
         })
       }

       if(req.isLoggedIn === false){
         console.log('/user/profile login = false')
         next();
       }


})//end of POST '/user/profile'


app.get('/user/resetTestAccounts', function(req,res,next){

  redisapi.resetTestAccounts();
  next();

} )

app.post('/user/changeprofile', function(req,res,next){



  let badinput = false;
  let serverinputmsg = '';


  if(req.body.password){

    if (req.body.password !== req.body.passwordCheck){
      badinput = true;
      serverinputmsg = "Matching Passwords."
    }

    if (req.body.password.length < 7 || req.body.password.length > 32){
      badinput = true;
      serverinputmsg = "Did not meet password length."
    }

    if(!passwordPattern.test(req.body.password)){
      badinput = true;
      serverinputmsg = "Bad password pattern"
    }
  }

  if(req.body.email){
    req.body.email = req.body.email.toLowerCase();

    if (!emailPattern.test(req.body.email)){
        badinput = true;
        serverinputmsg = "No email Pattern match"
      }
  }


  if(badinput === true){

    res.send({name: 'Fail',message: `Failed: ${serverinputmsg}`})
  }else{

    next();
  }


}, function(req,res,next){



let failedResponse = {name: 'Fail', message:"An error occurred, please try again."};

  if(req.isLoggedIn){
    redisapi.getUserEmail(req.sessionID, function(err,email){


      if(email){//valid email was returned.

        //check what kind of change we are trying to make
        redisapi.getUserData(email, function(err,userDataString){

          if(userDataString){


            let data = JSON.parse(userDataString);

            switch(req.body.name){
              case "emailChange": {
                data.email = req.body.email;
                break;
              }

              case "passwordChange": {
                data.password = req.body.password;
                break;
              }

              case "twofaSignup": {
                data.twofa = 1;
                data.twofaSecret = req.body.twofaSecret;
                break;
              }

              case "twofaDisable":{
                data.twofa = 0;
                break;
              }

              case 'newapikey': {

                let oldKey = data.apiKey;
                data.apiKey = speakeasy.generateSecret({length: 20}).hex;
                createApiKey(data.email,data.apiKey,oldKey);
                break;
              }

              default:
            }

            if(req.body.name === 'passwordChange'){
              let passwordHash = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null)
              redisapi.changeUserPassword(data.email,passwordHash,function(err,result){
                if(result === 0 ){
                  res.send(JSON.stringify( {name: 'settingsUpdate', message: 'Your profile has been updated.'} ) )
                }else{
                  res.send(JSON.stringify(failedResponse))
                }
              })
            }else{


            redisapi.setUserData(email, data, function(err,result){

              if(result === 0){
                res.send(JSON.stringify( {name: 'settingsUpdate', message: 'Your profile has been updated.'} ) )
              }else{//something went wrong with the request.
                res.send(JSON.stringify(failedResponse))
              }
            })
          }


          }else{//something went wrong with the request.
            res.send(JSON.stringify(failedResponse))
          }

        })


      }else{//isLogged was true but we are not seening valid user:sess string on the backend for some reason
        res.send(JSON.stringify(failedResponse))
      }
    })
  }else{//isLoggedIn was set to false in * route.
    res.send(JSON.stringify(failedResponse))
  }


})


const createApiKey = (email,apiKey,oldKey) => {

  redisapi.getEmailFromApiKey(oldKey, (err,result) => {

      if(result){//the old key is already associated with an email address

        //remove key from db.
        redisapi.deleteApiKey(oldKey)
        //set the new key
        redisapi.setNewApiKey(apiKey,email)

      }else {

        //this is the first time the user requested an api key
        redisapi.setNewApiKey(apiKey,email)
      }
    })
  }

}//end of '/user'
