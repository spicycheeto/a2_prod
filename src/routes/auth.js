import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import createStore, { initializeSession } from "../store";

import cookieParser from "cookie-parser";
import bcrypt from "bcrypt-nodejs";


//input validation check
let emailPattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
let passwordPattern = new RegExp(/^[A-Za-z0-9\!\@\#\$\%\^\&\*]+$/);

var QRCode = require('qrcode');
var speakeasy = require('speakeasy');

//const crypto = require('crypto');


//server response messages during signup and login.
let authSuccess = {message: 'successful',isLoggedIn: true}


module.exports = function (app,passport,gmailer,redisapi){


app.get('/auth/createAdmin',function(req,res,next){

  redisapi.createUser('thuc@admin.com','thuc',bcrypt.hashSync('password', bcrypt.genSaltSync(8), null), function(err,result){

    if(result){
      console.log(result)
      return next();
    }else{
      console.log(result)
      return next()
    }
  })

})
/** checks if the users email has been verified.  Used in <Login >
**@params Obj req.body - {email: 'user@user.com', code: 'authentication code'}
**/
  app.post('/auth/isVerified',function(req,res,next){

    redisapi.getUserData(req.body.email, function(err,userDataString){

      if(!userDataString){//email is not linked to a valid account
        res.send({name: 'accountVerification', verified: false, newCode: false, message:'Invalid Code or email address'})
      }else{

      let userData = JSON.parse(userDataString);
      let inputCode = parseInt(req.body.code)

      console.log(typeof userData.activationNumber)
      console.log(userData.activationNumber)

      if(userData.activationNumber === 1){//user email has been verified
        console.log("userData.activationNumber === 1")
        res.send({name: 'accountVerification', message: "Email has already been verified."})
      }else{



        //code submitted by user does NOT match what we have on the backend server
        if(inputCode !== userData.activationNumber){
          console.log(`code !== activationNumber`)
          if(userData.activationLimit >= 5){//if limit is greater than or equal to 5: change code,reset the limit and resend email.
            console.log(`activationNumber >=5`)
            let newActivationNumber = Math.floor((Math.random() * 80000) + 10000);
            userData.activationLimit = 0;
            userData.activationNumber = newActivationNumber;

            redisapi.setUserData(req.body.email,userData,function(err,result){
              console.log(result)
              if(result === 0 || result === 1){
                 gmailer.sendActivationCode(userData);
                 res.send({name: 'accountVerification', verified: false, newCode: true, message: 'Email verification attempts have exceeded the limit. Please check your email for a new code'})

              }
            })

          }else{ //Limit is less than 5 but the user entered the wrong code. Increase the limit and send back an unverified message.
              console.log(`activationNumber < 5`)
            let newLimit = userData.activationLimit + 1;
            userData.activationLimit = newLimit;

            redisapi.setUserData(req.body.email,userData,function(err,result){
              if(result === 0 || result === 1){
               res.send({name: 'accountVerification', verified: false, newCode: false, message:'Invalid Code or email address'})
              }
            })

          }
         }
        }


        if(inputCode === userData.activationNumber){//set activation code =  1; user is now Verified in future login checks
          console.log(`code === activationNumber`)
          userData.activationNumber = 1;
          redisapi.setUserData(req.body.email,userData,function(err,result){
            if(result === 0 || result === 1){
              res.send({name: 'accountVerification', message: "Verification Successful. Please click the link to the login page."})
            }
          })
         }
      }})
  })//End of app.post('/auth/isVerified')



  // =================================
  // PROCESS SIGNUP ==================
  //==================================

  app.post('/auth/signup', function(req,res,next){

      let badinput = false;
      let serverinputmsg = {};

      req.body.email = req.body.email.toLowerCase();

      if (!emailPattern.test(req.body.email)){
          badinput = true;
          serverinputmsg.email = "No email Pattern match"
        }

        if(!passwordPattern.test(req.body.password)){
          badinput = true;
          serverinputmsg.email = "Bad password pattern"
        }

      if (req.body.password !== req.body.passwordCheck){
        badinput = true;
        serverinputmsg.repeatPasswod = "Repeat password error"
      }

      if (req.body.password.length < 7 || req.body.password.length > 32){
        badinput = true;
        serverinputmsg.passwordlength = "Did not meet password length"
      }

      if(req.body.userName.length < 4 || req.body.userName.length > 16){
        badinput = true;
        serverinputmsg.usernameLength = "Username did not meet required length"
      }

      if(badinput === true){
        console.log(serverinputmsg);
        res.send({name: 'Fail',message: 'Password requirements not met.'})
      }else{

        next();
      }

    },function(req,res,next){

      passport.authenticate('local-signup', function(err,user){


      if(err){
        console.log('error ' + err.message)
        res.send({name: 'Fail',message: 'User name already exists'});
      }
      if(!user){

        console.log(req.body.email)//user or email already exists**
        res.send( {name: 'Fail',message: 'User name already exists'});
      }

      console.log(`user: ${user}`)

    if(user){

      redisapi.getUserData(req.body.email,function(err,result){

        let userData = JSON.parse(result)
        gmailer.sendActivationCode(userData)
        res.send({name: 'accountVerification', type: 'email'})

      })}else{
          res.end({name: 'Fail',message: 'Password requirements not met.'})
        }
  })(req,res,next)});




  // =====================================
  // PROCESS LOGIN =======================
  // =====================================
  app.post('/auth/login', function(req,res,next){


      let badinput = false;
      let serverinputmsg = {};


      req.body.email.toLowerCase();




/*

    We are allowing users to login with email or username
      if (!emailPattern.test(req.body.email)){
          badinput = true;
          serverinputmsg.email = "Email Pattern mismatch"
          serverinputmsg.emailPattern = true;
        }
*/
      if(!passwordPattern.test(req.body.password)){
        badinput = true;
        serverinputmsg.email = "Bad password pattern during login"
        serverinputmsg.passwordPattern = true;
      }

      if(req.body.password < 7 || req.body.password > 32){
        badinput = true;
        serverinputmsg.email = "Bad password length during login"
        serverinputmsg.passwordlength = true;
      }

      if(badinput === true){
        console.log(serverinputmsg);
        res.send({name: 'Fail',message: 'Bad User Name or Password'})
      }else{


        next();
      }

  },function(req, res, next) {//req, username, password,

    passport.authenticate('local-login', function(err, user) {


      if (err) {
        console.log(err)
        return res.send( {name: 'Fail',message: 'Bad User Name or Password'});
      }
      if (!user) {
        console.log(err)
        //return res.status(400).send(JSON.stringify(authFail))
        return res.send( {name: 'Fail',message: 'Bad User Name or Password'});
      }

      req.session.maxAge = 1000;
      req.session.ttl = 1000;



    redisapi.getUserData(req.body.email,function(err,userDataObj){

      let userData = JSON.parse(userDataObj);
      var current_date = (new Date()).valueOf().toString();
      var random = Math.random().toString();

      if(userDataObj){

        //check activation status
        if(userData.activationNumber === 1){

          //if two factor auth is enabled set twofa session key in user-data and send a response back that forces redirect to /twofa route
          if(userData.twofa){

            console.log(req.sessionID)
            console.log(req.session)

            let key = crypto.createHash('sha1').update(current_date + random).digest('hex');
            let twofaSessionKey = Buffer.from(`${key} ${req.body.email}`).toString('base64')

            redisapi.setUserData(req.body.email,userData, function(err,result){
              if(result === 1 || result === 0){


                redisapi.setTwofaSessionKey(req.sessionID, twofaSessionKey, function(err,result){

                  if(result){
                    res.send(JSON.stringify({name: 'accountVerification', type: 'twofa', twofaSessionKey: twofaSessionKey}));
                  }else{
                    res.send( {name: 'Fail',message: 'Bad User Name or Password'});
                  }
                })
              }
            })

          }else{

          //get available tag then pass to session set
          let tag = 'blah';
          console.log('email:::')
          console.log(req.body.email)
          //if two factor auth is not enabled go ahead and fully authenticate the user:
          req.sessionStore.set(req.sessionID,req.session, req.body.email, function(err,result){

            console.log(`set session result result: ${result}`);

            if(result){

              res.send(JSON.stringify(authSuccess))
            }
          });
         }
        }else {//activation code is not equal to one. User needs to verify their email.
          res.send({name: 'accountVerification', type: 'email'})
        }
      }
    });
   })(req, res, next);
});





    // =====================================
    // PROCESS LOGOUT ======================
    // =====================================
    app.get('/auth/logout', function(req,res){


    req.sessionStore.destroy(req.sessionID, function(err, logout){
      console.log(`req.sessionStore.destroy logout: ${logout}`)

      logout ? res.send(JSON.stringify({isLoggedIn: false})) : res.send(JSON.stringify({isLoggedIn: true}))
    })
  });



  app.post('/auth/isAuthorized', function(req,res,next){
    if(req.isLoggedIn){
      res.send(JSON.stringify({isLoggedIn: true}))
    }else{
      res.send(JSON.stringify({isLoggedIn: false}))
    }
  })




/*
*Params:
* req.body.email
*/

  app.post('/auth/forgotpassword', function(req,res,next){

/*
*
* INPUT VALIDATION OCCURS HERE
*
*/

      let badinput = false;
      let serverinputmsg = {};

      req.body.email = req.body.email.toLowerCase();

      if (!emailPattern.test(req.body.email)){
          badinput = true;
          serverinputmsg.email = "Email Pattern mismatch"
          serverinputmsg.emailPattern = true;
        }

      if(badinput === true){
        console.log(serverinputmsg);
        res.send({name: 'Fail',message: 'Invalid email'})
      }else{


        next();
      }

  },function(req, res, next) {

    //Get users email from User-Data
    //create forgotPasswordKey
    //set forgotPasswordKey on User-Data
    //if all is good, send email to user with validation key and link.

    redisapi.getUserData(req.body.email, function(err,UserDataString){

      if(UserDataString){

        let data = JSON.parse(UserDataString);

        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();


        data.forgotPasswordKey = crypto.createHash('sha1').update(current_date + random).digest('hex');

        data.forgotPasswordLimit = 0;

        redisapi.setUserData(req.body.email,data,function(err,result){
          if(result == 1 || result == 0){

            //send email with forgotpassword key.
            let forgotPasswordKey = Buffer.from(`${data.forgotPasswordKey} ${req.body.email}`).toString('base64')
              let messageData = {
                       email: req.body.email,
                       forgotPasswordKey: forgotPasswordKey,
                      }
              gmailer.sendForgotPasswordCode(messageData);
            res.send({name: 'forgotPassword', message: 'A new password link has been sent to your email!'})
          }
        })

      }else{//bad email was submitted
        res.send({name: 'forgotPassword', mesage: 'Bad Email.'})
      }
    })
  });



/*Change Users Password after forgotpassword request.
*Params:
*req.body.email
*req.body.password
*req.body.passwordCheck
*req.body.key String Validation key that was sent to users email address.
*/
app.post('/auth/changePassword', function(req,res,next){

  let badinput = false;
  let serverinputmsg = {};

  req.body.email = req.body.email.toLowerCase();

  console.log(req.body)

  if (!emailPattern.test(req.body.email)){
      badinput = true;
      serverinputmsg.email = "No email Pattern match"
    }

    if(!passwordPattern.test(req.body.password)){
      badinput = true;
      serverinputmsg.email = "Bad password pattern"
    }

  if (req.body.password !== req.body.passwordCheck){
    badinput = true;
    serverinputmsg.repeatPasswod = "Repeat password error"
  }

  if (req.body.password.length < 7 || req.body.password.length > 32){
    badinput = true;
    serverinputmsg.passwordlength = "Did not meet password length"
  }

  if(badinput === true){
    console.log(serverinputmsg);
    res.send({name: 'Fail',message: 'Something went wrong -- bad input'})
  }else{

    next();
  }



},function(req,res,next){

redisapi.getUserData(req.body.email, function(err,userDataString){

    if(userDataString && req.body.key !== 0){

      let data = JSON.parse(userDataString);
      console.log(`data.forgotPassword: ${data.forgotPasswordKey}`)

      if(data.forgotPasswordKey !== null){
        if(data.forgotPasswordKey === req.body.key && parseInt(data.forgotPasswordLimit) < 3) {
          //user submitted a valid email address and password key AND has not exceeded the maximum number of attempts.
          let passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)

          redisapi.changeUserPassword(req.body.email, passwordHash, function(err,result){
            if(err) return; //some kind of error occurred and users-hash was NOT updated.
            console.log('changing password.......')
            console.log(result)

          })

          data.forgotPasswordKey = '0';
          data.forgotPasswordLimit = '0';

          redisapi.setUserData(req.body.email,data, function(err,result){
            if(result == 0 || result == 1){
              res.send({name: 'forgotPassword', message: 'Password Changed Successfully'})
            }else{
              //some kind of error occurred and user-data was not updated.
              res.send({name: 'Fail',message: 'Something went wrong --user data not updated'})
            }
          })
        }else{//either the user submitted a bad key or maximum number of tries was reached.
          if(parseInt(data.forgotPasswordLimit) > 2){
            //send email here with new key
            res.send({name: 'Fail',message: 'Maximum number of attempts reached =( \r\n Please forget your password again.'})

          }else{
            //bad key was submitted. increment passwordlimit and notify user.

            console.log(req.body.key)
            console.log(data.forgotPasswordKey)

            data.forgotPasswordLimit = (parseInt(data.forgotPasswordLimit) + 1).toString();
            redisapi.setUserData(req.body.email,data, function(err,result){
              res.send({name: 'Fail',message: 'Something went wrong --bad key'})
            })
          }

        }

      }

    }else{
      res.send({name: 'Fail',message: 'Something went wrong'}) //bad email OR req.body.key !== 0

      /******from here we can implement password changes from user console*******/
    }

 });
});

app.post('/auth/twofaauth', function(req,res,next){

  //verify input here

  next();
  }, function(req,res,next){



    let sessionid = cookieParser.signedCookie(req.cookies['connect.sid'],'ilovecafesua')
    let decodedKeyArr = Buffer.from(`${req.body.key}`, 'base64').toString('ascii').split(" ")
    req.sessionID = sessionid;
    if(decodedKeyArr[1]){

      let email = decodedKeyArr[1];

      redisapi.getTwofaSessionKey(sessionid, function(err,result){

        if(result === req.body.key){

          redisapi.getUserData(email, function(err,userDataString){

            let dataObj = JSON.parse(userDataString);

            let token = speakeasy.totp({
              secret: Buffer.from(dataObj.twofaSecret, 'hex'),
              encoding: 'hex',
            })

            if(token === req.body.token){//user passed a valid token and has the correct cookie

              req.session.maxAge = 1000;
              req.session.ttl = 1000;

              req.sessionStore.set(sessionid,req.session, email, function(err,result){


                if(result){

                    res.send({name: 'twofaSuccess',message: 'twofa success'})
                }
              });
            }else{
              res.send({name: 'Fail',message: 'Incorrect Token'})
            }

          })
        }
      })

    }


  })

}
