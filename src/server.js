
import express from "express";
import session from "express-session";

import path from "path";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import Helmet from "react-helmet";

import createStore, { initializeSession } from "./store";

import cookieParser from "cookie-parser";
var bodyParser = require('body-parser')

var localStrategy = require("passport-local");


/***db connections***/
let Redis = require("redis");
let RedisStore = require('connect-redis')(session);
let redisclient = Redis.createClient('6379','172.17.0.3');
import {RedisApi} from './config/RedisApi.js';
const appBaseRedisApi = new RedisApi(redisclient);


/***MAIL Configuration (disabled) ***/

import {Mailer} from '../Mailer.js';
const gmailer = new Mailer();
gmailer.initialize();


/***passport for configuration***/
var passport = require("passport");
require('./config/passport')(passport,session,appBaseRedisApi);


const app = express();
//app.use(bodyParser());


app.use(bodyParser.json({limit: '1mb', type: 'application/json',}));

//app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//Redis Session Store Initialization:
/*********************************************/
app.use(session({store: new RedisStore({

  client: redisclient,
  host:'192.168.111.140',
  port:'6379',
  ttl: 6000,
  disableTTL: false,

}),
    secret: 'ilovecafesua',
    resave: false,
    saveUninitialized: false,
  //  cookie: {
  //  expires: new Date( Date.now() + 60 * 60 * 100 )
  //  }
  }
));


//app.use(logger('dev'));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json({limit: '50mb'}));
//
//app.use(express.limit('10mb'))

app.use( express.static( path.resolve( __dirname, "../dist" ) ) );


app.post("*", (req,res,next) => {

  console.log('***** POST DETECTED *****')
  isLoggedIn(req,next);

})

app.get("*", (req,res,next) => {

  console.log('***** GET DETECTED *****')
  isLoggedIn(req,next)

})

/* Example of blocking requests to sub folders in /dist
app.get("/content/*", (req,res,next) => {

  res.write(302, { "Content-Type": "text/html" })
  res.end(badPageRequest())

})*/



/***chooseit route ***/
require('./routes/cardDisplay.js')(app,appBaseRedisApi);

/***cart routes ***/
require('./routes/cart.js')(app,appBaseRedisApi);

/***User Routes**/
require('./routes/user.js')(app,appBaseRedisApi);

/***Auth Routes**/
require('./routes/auth.js')(app,passport,gmailer,appBaseRedisApi);

/***Layout Route***/
require('./routes/layout.js')(app,appBaseRedisApi);

app.use(function(err, req, res, next){
console.log('Syntax Error!, server.js, line 125')
  if (err instanceof SyntaxError) {//TODO: Log Syntax Error here and return nothing.
    return res.end(JSON.stringify( { name: 'message', message: 'error 4534' } ) )
  } else {
    return res.end(JSON.stringify( { name: 'message', message: 'error 1111' } ) )
  }

});



/* Verifies current session cookie is authenticated
* Returns True if authenticated; False otherwise.
*/
function isLoggedIn(req,next) {

console.log("SERVER.JS--checking logged in status...");
console.log(req.cookies['connect.sid']);

req.sessionStore.get(cookieParser.signedCookie(req.cookies['connect.sid'],'ilovecafesua'),function(err,result){

  if(result){

    console.log(`isLoggedIn came back true`);
    req.isLoggedIn = true;
    return next()

  }else{
    console.log(`isLoggedIn came back false`);
    req.isLoggedIn = false;
    return next()
  }
})

}



const badPageRequest = () => {



 return `
    <!DOCTYPE html>
    <html>
    <head>
      ​<link rel="stylesheet" type="text/css" href="app.css">
      <link rel="stylesheet" type="text/css" href="w3.css">


        <meta charset="utf-8">

          <title>React SSR</title>
    </head>

    <body>
          <div id="app"></div>




    </body>
    </html>
`;

}

app.listen( 3333 );
