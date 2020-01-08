import React from "react";
import ReactDOM from "react-dom";

import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { initializeSession, fetchLoggedIn,getJsx } from "../../store";

import Header from "./Header.js";
import routes from "../../routes/clientRoutes/AuthorizedRoutes.js";



class AuthorizedLayout extends React.Component {

    constructor() {
        super();
        this.state = {};

        this.fetchStore = this.fetchStore.bind(this);
    }


    fetchlayout(){
      const data = this.props.store.getState()
    }

    fetchStore(){
      return this.props.store;
    }


    render() {
      this.fetchlayout();
      const state = this.props.store.getState()
      console.log('authorizedLayout')
      console.log(state)

        return (
            <div>

              <Header />
                <Switch>
                    { routes.map( route => <Route  key={ route.path }  { ...route } /> ) }
                </Switch>


            </div>
        );
    }
}



export default AuthorizedLayout;
