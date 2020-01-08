import React from "react";
import { renderToString,renderToStaticMarkup } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";

import Helmet from "react-helmet";
import routes from "./clientRoutes/AuthorizedRoutes.js";


import AuthorizedLayout from "../components/Authorized/AuthorizedLayout";
import UnauthLayout from "../components/Unauthorized/UnauthLayout.js";

import createStore, { initializeSession,defaultStoreData,initializeStoreData ,initializeUsername} from "../store";

import fetch from "isomorphic-fetch";




module.exports = function (app,redisApi){


app.get( "/*", ( req, res ) => {


    if(req.isLoggedIn){

      const context = {};
      const store = createStore( );

      store.dispatch(initializeSession(req.isLoggedIn) );


      redisApi.getUserEmail(req.sessionID, function(err,email){
        if(err) return next();

        redisApi.getUserData(email, function(err,userDataStr){

          if(err) return next()
          let data = JSON.parse(userDataStr);



          store.dispatch(initializeUsername(data.username))

    /*********************Authenticated Layout:***************************************/
    const dataRequirements =
        routes
            .filter( route => matchPath( req.url, route ) ) // filter matching paths
            .map( route => route.component ) // map to components
            .filter( comp => comp.serverFetch ) // check if components have data requirement
            .map( comp => store.dispatch( comp.serverFetch( ) ) ); // dispatch data requirement

    Promise.all( dataRequirements ).then( ( ) => {
      const jsx = (
          <ReduxProvider store={ store }>
              <StaticRouter context={ context } location={ req.url }>
                  <AuthorizedLayout  store={ store }/>
              </StaticRouter>
          </ReduxProvider>
      );
        const reactDom = renderToString( jsx );
        const reduxState = store.getState( );
        const helmetData = Helmet.renderStatic( );

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( authorizedHtmlTemplate( reactDom, reduxState, helmetData ) );

      } );
    })
})
    /*******************************************************************/
  }else{
    const context = {};

    const store = createStore( );
    store.dispatch(initializeSession(req.isLoggedIn) );


    const jsx = (
        <ReduxProvider store={ store }>
            <StaticRouter context={ context } location={ req.url }>
                <UnauthLayout  store={ store }/>
            </StaticRouter>
        </ReduxProvider>
    );

      const reactDom = renderToString( jsx );
      const reduxState = store.getState( );
      const helmetData = Helmet.renderStatic( );
    console.log('layout.js.......')

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( unauthorizedHtmlTemplate(reactDom,reduxState,helmetData) );

  }
} );

//  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

//<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
//<link href="https://fonts.googleapis.com/css?family=Special+Elite" rel="stylesheet">


//example: the directory contents where the file resides is determined in the admin portal
let dynamicHeader = '/content/css/Header/Live/header.css' //pull this file from somewhere in the directory

function unauthorizedHtmlTemplate(reactDom,reduxState,helmetData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        ​ <link rel="stylesheet" type="text/css" href="app.css">
        ​ <link rel="stylesheet" type="text/css" href=${dynamicHeader} >
         <link rel="stylesheet" type="text/css" href="w3.css">

            <meta charset="utf-8">
              ${ helmetData.title.toString( ) }
              ${ helmetData.meta.toString( ) }
              <title>Unauthenticated React SSR</title>
        </head>

        <body>
              <div id="app">${ reactDom }</div>
                <script>
                    window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
                </script>

                <script src="https://js.braintreegateway.com/web/dropin/1.18.0/js/dropin.min.js"></script>
                <script src="./index.bundle.js"></script>
                <script src="./vendors~authindex~index.bundle.js"></script>
                <script src="./vendors~index.bundle.js"></script>



        </body>
        </html>
    `;
}
//<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
//<link href="https://fonts.googleapis.com/css?family=Special+Elite" rel="stylesheet">

function authorizedHtmlTemplate( reactDom, reduxState, helmetData ) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
        ​ <link rel="stylesheet" type="text/css" href="app.css">
        <link rel="stylesheet" type="text/css" href=${dynamicHeader} >
         <link rel="stylesheet" type="text/css" href="w3.css">


            <meta charset="utf-8">
              ${ helmetData.title.toString( ) }
              ${ helmetData.meta.toString( ) }
              <title>Authenticated React SSR</title>
        </head>

        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>


                    <script src="./authindex.bundle.js"></script>
                    <script src="./vendors~authindex.bundle.js"></script>
                    <script src="./vendors~authindex~index.bundle.js"></script>

        </body>
        </html>
    `;
 }
}

//Entrypoint app = vendors~app~index~userpage.bundle.js vendors~app~index.bundle.js vendors~app.bundle.js app~index~userpage.bundle.js app.bundle.js
