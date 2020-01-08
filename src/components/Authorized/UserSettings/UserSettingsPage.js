import React, {Component}from "react";
import {  Redirect } from 'react-router'
import { connect } from "react-redux";
import {checkAuth,doProfilePage,removeData} from "../../../store.js"


import SettingsTabs from './SettingsTabs';


class UserSettingsPage extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.loadPage = this.loadPage.bind(this);
    }


componentWillMount(){

  checkAuth(this.props.loggedIn, this.props.dispatch);

}

componentWillMount(){
  console.log(`UserProfileDAta component will mount`)
  this.props.data.some(e => e.name === 'userData') ? '' : doProfilePage({name: 'settings'}, this.props.dispatch)
 }

componentWillUnmount(){
  console.log(`UserProfileDAta Unmounting`)
  this.props.data.some(e => e.name === 'userData') ? removeData('userData',this.props.dispatch) : ''
}

    loadPage(){
      if(this.props.loggedIn){
        return (
          <div className="pageContainer" style={{"paddingTop": "0px"}}>

              <SettingsTabs loadPage={this.loadPage}/>
          </div>
        )
      }else{
        document.location = 'http://localhost:3333'
        //return (<h1>redirect</h1>
      }
    }



    render() {




        return (

          <div style={{"marginTop": "125px"}}>
            {this.loadPage()}
          </div>

        );
    }
}

const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( UserSettingsPage );
