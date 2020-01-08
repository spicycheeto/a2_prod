
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";

import AuthorizedLayout from "./components/Authorized/AuthorizedLayout.js";
import createStore from "./store";
const store = createStore( window.REDUX_DATA );

//const TESTER = document.getElementById('tester');


const jsx = (
  <ReduxProvider store={ store }>
      <Router>
          <AuthorizedLayout store={ store }/>
      </Router>
  </ReduxProvider>
)


const app =  document.getElementById( "app" )

ReactDOM.hydrate(jsx,app)
