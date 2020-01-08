var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var Base64 = require('js-base64').Base64;
// If modifying these scopes, delete your previously saved credentials
// at TOKEN_DIR/gmail-nodejs.json
var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.send'];

// Change token directory to your system preference
var TOKEN_DIR = ('./');
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs.json';

var gmail = google.gmail('v1');

let contentFile = '';

const getNewToken = function(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: SCOPES});
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

const storeToken = function(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if(err) throw err;

    console.log('Token stored to ' + TOKEN_PATH);

  });
}



export class Mailer {



  constructor() {

    this.initialize = function(){
      // Load client secrets from a local file.

       fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
          console.log('Error loading client secret file: ' + err);
          return;
        }


        contentFile = content;


      });
    }

    this.initialize = this.initialize.bind(this);
    this.authorize = this.authorize.bind(this);
    this.listLabels = this.listLabels.bind(this);
    
    this.sendActivationCode = this.sendActivationCode.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

  }

genNewToken(){

let credentials = JSON.parse(contentFile);

      var clientSecret = credentials.installed.client_secret;
      var clientId = credentials.installed.client_id;
      var redirectUrl = credentials.installed.redirect_uris[0];

 var OAuth2 = google.auth.OAuth2;
 var oauth2Client = new OAuth2(clientId, clientSecret,  redirectUrl);
 getNewToken(oauth2Client, function(oauth2Client){
   console.log('new token callback success')
   console.log(oauth2Client)
 })
}

sendActivationCode(activationOptions){
  this.authorize(JSON.parse(contentFile),activationOptions, this.sendMessage);
}


sendForgotPasswordCode(activationOptions) {
  console.log(activationOptions)
  this.authorize(JSON.parse(contentFile), activationOptions, this.sendForgotPasswordMessage);
}


authorize(credentials,options, callback) {

    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];

    var OAuth2 = google.auth.OAuth2;

    var oauth2Client = new OAuth2(clientId, clientSecret,  redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        if(options.activationNumber){
         callback(oauth2Client,options.email,options.activationNumber); //activation option was detected (we are sending an activation code email)
       }

       if(options.forgotPasswordKey){
         callback(oauth2Client, options.email, options.forgotPasswordKey);
       }else {
         callback(oauth2Client); //callback that has no param requirements.
       }
      }
    });
}




/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
listLabels(auth) {
  gmail.users.labels.list({auth: auth, userId: 'me',}, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    var labels = response.data.labels;

    if (labels.length == 0) {
      console.log('No labels found.');
    } else {
      console.log('Labels:');
      for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        console.log('%s', label.name);
      }
    }
  });
}

/* sends an activation email
* @param auth gmail api authorization info
*@param activationOptions {object} email: To email, activation: activation the user must return.
*/
sendMessage(auth,recipient,code) {

  let email = {message: `To: "New User" <${recipient}>\r\nContent-type: text/html;charset=iso-8859-1\r\nMIME-Version: 1.0\r\nSubject: Activation Code\r\n\r\nThis email was sent because you set up a new account. Use activation code: ${code} to activate your account.`}

  let base64EncodedEmail = Base64.encodeURI(email.message);

  gmail.users.messages.send({'auth': auth, 'userId': 'me',  'resource': {
    "payload": {
      //"mimeType": 'message/rfc822',
      "headers": [
        {name: "To", value: `New User <${recipient}>`},
        {name: 'From', value: 'Axel Long <axellongkong@gmail.com>'},
        {name: 'Subject', value: 'Activation Code'}]
    },
    'raw': base64EncodedEmail,


    }},function(err,response){

    if(err) throw err;


  });
}

//http://www.google.com
/* sends an sendForgotPasswordMessage email
* @param auth gmail api authorization info
*@param activationOptions {object} email: To email, activation: activation the user must return.
*/
sendForgotPasswordMessage(auth,recipient,code) {

  let email = {
    message: `To: "New User" <${recipient}>\r\nContent-type: text/html;charset=iso-8859-1\r\nMIME-Version: 1.0\r\nSubject: Activation Code\r\n\r\n
    A request for a new password was made for your account. Please follow the link below to complete the process.
    http://localhost:3333/WkdReVlqQTNOR00yT0dKaE1tUTNNMlZsT1RJNFpXVTJaalppWWpVMVpESmlOV1JoWkRCbFpHeFpHUXlZakEzTkdNMk9HSmhNbVEzTTJWbE9USTRaV1UyWmpaaVlqVTFaREppTldSaFpEQmxaR3hzb21lc3BlY2lhbHNhdWNl${code}`
              }

  let base64EncodedEmail = Base64.encodeURI(email.message);

  gmail.users.messages.send({'auth': auth, 'userId': 'me', 'resource': {
    "payload": {
      //"mimeType": 'html',
      "headers": [
        {name: "To", value: `New User <${recipient}>`},
        {name: 'From', value: 'Axel Long <axellongkong@gmail.com>'},
        {name: 'Subject', value: 'Activation Code'}]
    },
    'raw': base64EncodedEmail,


    }},function(err,response){

    if(err) throw err;
    console.log('********************************************');
    console.log(response);

  });
}



  //end of Mailer Class
}
