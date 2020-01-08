import React from 'react';
import { Link, Redirect  } from "react-router-dom";
import { connect } from "react-redux";
import {doLogin,doSignup,removeData,addData } from "../../store";

import AccountVerification from "./AccountVerification.js";


class Login extends React.Component {

  constructor(props){
    super(props)

    this.state = {email: "default", password: "default", userName:"default", passwordCheck:"default"}


    this.emailChange = this.emailChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
    this.userNameChange = this.userNameChange.bind(this)
    this.passwordCheckChange = this.passwordCheckChange.bind(this)

    this.processLogin = this.processLogin.bind(this)
    this.processSignup = this.processSignup.bind(this)
    this.loginCheck = this.loginCheck.bind(this)
    this.hideModal = this.hideModal.bind(this)
  //  this.verified = this.verified.bind(this)

  }



    emailChange(event) {

      this.setState({
        email: event.target.value
      })
    }

    passwordChange(event) {

      this.setState({
        password: event.target.value
      })
    }

    userNameChange(event) {

      this.setState({
        userName: event.target.value
      })
    }

    passwordCheckChange(event) {

      this.setState({
        passwordCheck: event.target.value
      })
    }

hideModal(event){
    removeData(event.target.id, this.props.dispatch)

  }

  processLogin(){
    doLogin(this.state,this.props.dispatch);
  }

  processSignup(){

    doSignup(this.state,this.props.dispatch);
  }



  loginCheck(){

    if(this.props.loggedIn){

      document.location = 'http://192.168.111.151:3333/';
    }

  }

  checkVerification(){


    return (this.props.data.map(e => {

      if(e.name === 'accountVerification'){

        switch(e.type){

          case "twofa": {
            addData({name: "twofaPage", key: e.twofaSessionKey}, this.props.dispatch)
            return <Redirect to='/twofa' />

          }

          case "email": {
            addData({name: "verificationPage"}, this.props.dispatch)
            return <Redirect to='/verification' />

          }
        }

      }
    }))
  }



  componentWillUnmount(){
    if(this.props.data.some(e => e.name === 'Fail')){
      removeData('Fail',this.props.dispatch);
    }
  }


/*
<div>
  {this.props.data.some(e => e.name === 'accountVerification') ? this.checkVerification() : this.loginCheck()}
</div>
*/

render(){

console.log(this.props.data)

  return(


    <div className="landingPageModal"  id="loginModal" onClick={this.hideModal}>
    {this.props.data.some(e => e.name === 'accountVerification') ? this.checkVerification() : this.loginCheck()}

        <div className="landingPageModalMain" style={{"borderStyle": "solid"}} >

          <div className="landingPageModalInputContainer">
            <div className="flexContainerRow" style={{"marginBottom": "5%"}}>
              <i className="material-icons" style={{"backgroundColor":"white", "border": "none"}}>email</i>
              <input className="landingPageInput" type="text" id="email" name="email" onChange={this.emailChange} placeholder="Email Or Username"></input>
            </div>

            <div className="flexContainerRow" style={{"marginBottom": "5%"}}>
              <i className="material-icons" style={{"backgroundColor":"white", "border": "none"}}>lock</i>
              <input className="landingPageInput" type="password" id="password" name="password" onChange={this.passwordChange} placeholder="Password"></input>

            </div>

            <button className="profileButton" id="blueButton" onClick={this.processLogin} style={{"fontSize": "x-large", "height": "50px", "width": "150px", "margin": "10%"}}>Login</button>

              <div>
                  <h1>{this.props.data.map(e => e.name === 'Fail' ? e.message : '')}</h1>
              </div>
          </div>
        </div>
    </div>
  )


 }
}

const mapDispatchToProps = {


}

const mapStateToProps = ( state ) => ({

  loggedIn: state.loggedIn,
  data: state.data

});


export default connect(mapStateToProps)(Login);
