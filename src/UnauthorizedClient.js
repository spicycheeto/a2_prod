import ReactDOM from "react-dom";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import UnauthLayout from "./components/Unauthorized/UnauthLayout.js";
import createStore from "./store";

const store = createStore( window.REDUX_DATA );


const jsx = (
  <ReduxProvider store={ store }>
      <Router>
          <UnauthLayout store={ store }/>
      </Router>
  </ReduxProvider>
)

const app =  document.getElementById( "app" )

ReactDOM.hydrate(jsx,app)
