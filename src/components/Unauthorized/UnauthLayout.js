import React from "react";
import ReactDOM from "react-dom";

import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { initializeSession, fetchLoggedIn,getJsx } from "../../store";

import Header from './Header.js';
import routes from '../../routes/clientRoutes/unauthorizedRoutes.js';


class Layout extends React.Component {

    constructor() {
        super();
        this.state = {forgotPasswordPage: false};

    }





    render() {
        return (
            <div>
              <Header dispatch={this.props.store.dispatch} forgotPasswordPage={this.state.forgotPasswordPage}/>
                <Switch>
                  { routes.map( route => <Route key={ route.path }  { ...route } /> ) }
              </Switch>

            </div>
        );
    }

}


export default Layout;
