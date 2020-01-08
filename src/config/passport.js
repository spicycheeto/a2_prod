// load all the things we need
var LocalStrategy  = require('passport-local').Strategy;

//handle password hashes
import bcrypt from "bcrypt-nodejs";



// expose this function to our app using module.exports
module.exports = function(passport,session,redisapi) {


    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session


    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

        req.sessionStore.findOne(email, function(err, user){



            if(err){
              console.log('err')
              return done(err); //some error occurred while trying to get email from redis server.
            }

            if(user){
              console.log('username already exits')
              return done(null,false) //email already exists in the redis server. End authentication flow.
            }

            //we need to determine if the username exists here before creating a new user:

            redisapi.createUser(email,req.body.userName,bcrypt.hashSync(password, bcrypt.genSaltSync(8), null), function(err,result){

              if(result){
                done(null,true)
              }else{
                done(err,null)
              }
            })

        })
      });
    }));



    // =========================================================================
     // LOCAL LOGIN =============================================================
     // =========================================================================
     // we are using named strategies since we have one for login and one for signup
     // by default, if there was no name, it would just be called 'local'

     passport.use('local-login', new LocalStrategy({
         // by default, local strategy uses username and password, we will override with email
         usernameField : 'email',
         passwordField : 'password',
         passReqToCallback : true // allows us to pass back the entire request to the callback
     },
     function(req, username, password, done) { // callback with email and password from our form


       redisapi.findOne(username, function(err, result){


         if(err){
           return done(err); //some error occurred while trying to get email from redis server.
         }

         if(result){//username is a valid email address that can be submitted to getUserPassword()


            req.body.email = username;

            redisapi.getUserPassword(req.body.email, (err,passwordHash) => {
              console.log(passwordHash)
            bcrypt.compareSync(password, passwordHash) ? done(null,req.body.email) : done(null,false)
            })
         }else {//(user submitted username instead of email) see if we have a email linked to that username.

           redisapi.findEmailFromUsername(username,function(err,result){

             if(result){//valid email is linked to this username set email value and check password against Users-Hash
               console.log('pasport result:')
               console.log(result)
               req.body.email = result;
               redisapi.getUserPassword(req.body.email, (err,passwordHash) => {
              
               bcrypt.compareSync(password, passwordHash) ? done(null,req.body.email) : done(null,false)
               })
             }else{

               return done(null,false) //username doesn't exist.
             }

         })
        }
  })}));
}
