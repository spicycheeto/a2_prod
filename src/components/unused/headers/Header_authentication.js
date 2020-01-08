import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React, {Component} from 'react';
import {addData, removeData} from '../../store';


let globalDispatch;
let globalData;

function mapProps(dispatch,data){
  globalDispatch = dispatch;
  globalData = data;
}


const Header = ( { loggedIn,data, dispatch } ) => (



    <div className="navbar">

      {mapProps(dispatch,data)}


      <div className="headerFlexbox">

        <img  style={{"marginLeft": "130px"}} src="./content/logo.png" />

          { data.some(e => e.name === "forgotPaswordPage" || e.name === "verificationPage") ? '' : loadHeaderLinks() }

      </div>
    </div>

);

function loadHeaderLinks() {

  return(
    <div className="headerLinks">
      <div><a href="#" onClick={handleLoginClick}>Login</a></div>
      <div><a href="#" onClick={handleSignupClick}>Signup</a></div>
    </div>
  )
}

function handleLoginClick() {
  console.log('handleloginclick()')
  if(globalData.some(e => e.name === 'signupModal')){
    removeData('signupModal',globalDispatch)
  }

  return addData({name: 'loginModal'}, globalDispatch)
}

function handleSignupClick() {
console.log('handlesignupclick()')
  if(globalData.some(e => e.name === 'loginModal')){
    removeData('loginModal',globalDispatch)
  }

return  addData({name: 'signupModal'}, globalDispatch);

}

const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
     data: state.data,
} );

export default connect( mapStateToProps )( Header );
