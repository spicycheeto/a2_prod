import React from "react";
import ReactDOM from "react-dom";

import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { initializeSession, fetchLoggedIn,getJsx } from "../../../store";

import Header from "../Header.js";
import routes from "../../../routes/clientRoutes/userpageroutes.js";



class UserPageLayout extends React.Component {

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


        return (
            <div>

                <div className="mainbox">
                    <h1>Admin Page</h1>
                </div>

              <Header />
                <Switch>

                    { routes.map( route => <Route  key={ route.path }  { ...route } /> ) }
                </Switch>


            </div>
        );
    }
}



export default UserPageLayout;
