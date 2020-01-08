import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {accountVerification,removeData,addData} from '../../store.js';




class AccountVerification extends Component {

  constructor(props){
    super(props)

    this.state = {
      email: 'default',
      code: 'default'

    }

    this.emailChange = this.emailChange.bind(this);
    this.codeChange = this.codeChange.bind(this);
    //this.hideModal = this.hideModal.bind(this);
    //this.hideVerificationModal = this.hideVerificationModal.bind(this)

    this.getCode = this.getCode.bind(this);
    this.processVerification = this.processVerification.bind(this);
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/
codeChange(event){
  this.setState({code: event.target.value})
}

emailChange(event){
  this.setState({email: event.target.value})
}

processVerification(){

  accountVerification(this.state,this.props.dispatch);
}

/*

hideModal(event){

removeData(event.target.id, this.props.dispatch)

  }
*/
/*
  hideVerificationModal(event){
    removeData('accountverifcation', this.props.dispatch);
    removeData(event.target.id, this.props.dispatch)
  }
*/
/*
  componentWillMount(){
    this.props.data.some(e => e.name === "verificationPage") ? '' : addData({name: "verificationPage"}, this.props.dispatch)
  }
*/
getCode(){
  return(

    <div className="landingPageModal"  id="signupModal">
        <div className="landingPageModalMain" >
            <h3>We have sent a verification code to the email address you provided. Please enter your code and email below:</h3>
          <div className="landingPageModalInputContainer">
            <div className="flexContainerRow" style={{"marginBottom": "5%"}}>
              <i className="material-icons" style={{"backgroundColor":"white", "border": "none"}}>email</i>
              <input className="landingPageInput" type="text" id="email" name="email" onChange={this.emailChange} placeholder="Email"></input>

            </div>

            <div className="flexContainerRow" style={{"marginBottom": "5%"}}>
              <i className="material-icons" style={{"backgroundColor":"white", "border": "none"}}>check_circle</i>
              <input className="landingPageInput" type="text" id="VerificationCode" name="code" onChange={this.codeChange} placeholder="Verification Code"></input>
            </div>


            <a href="/">> Return to login page ?</a>
            <button className="profileButton" id="blueButton" onClick={this.processVerification} style={{"fontSize": "x-large", "height": "50px", "width": "150px", "margin": "10%"}}>Verify</button>

          </div>
          <div>
              <h1>{this.props.data.map(e => e.name === 'accountVerification' ? e.message : '' )}</h1>
          </div>
        </div>
    </div>

  )
}

//{this.props.data.some(e => {if(e.name === 'accountVerification'){return e.verified}}) ? this.successful() : this.getCode()}

render(){


  return(
  <div>

    {this.getCode()}


  </div>

  )
 }

}

const mapDispatchToProps = {}

const mapStateToProps = ( state ) => ({

  loggedIn: state.loggedIn,
  data: state.data
});



export default connect(mapStateToProps)(AccountVerification);
