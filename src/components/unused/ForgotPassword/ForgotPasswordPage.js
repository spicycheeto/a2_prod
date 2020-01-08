import React, {Component} from 'react'
import { connect } from "react-redux";

import {doForgotPassword,addData} from '../../../store.js';


class ForgotPasswordPage extends Component {

  constructor(props){
    super(props)

    this.state = {email: 'default', password: "default", passwordCheck:"default", key: "default"}


    this.passwordChange = this.passwordChange.bind(this);
    this.passwordCheckChange = this.passwordCheckChange.bind(this);
    this.processForgotPassword = this.processForgotPassword.bind(this);

  }

  passwordChange(event) {

    this.setState({
      password: event.target.value
    })
  }

passwordCheckChange(event) {
console.log('passwordCheckChange')
  this.setState({
    passwordCheck: event.target.value
  })
}


processForgotPassword(){
  if (this.state.password !== this.state.passwordCheck){
    this.setState({badPassword: true})
  }else{
    //process forgot password
    doForgotPassword({email: this.state.email, password: this.state.password, passwordCheck: this.state.passwordCheck, key: this.state.key}, this.props.dispatch)
  }
}

loadMessage(){

  if(this.props.data.some(e => e.name === 'Fail')){
    return (this.props.data.map(e => {
      if(e.name === 'Fail'){

        return (<h3 style={{"color": "green"}}>{e.message}</h3>);

      }else{return '';}})
   )
  }

  if(this.props.data.some(e => e.name === 'forgotPassword')){
    return (this.props.data.map(e => {
      if(e.name === 'forgotPassword'){

        return (
          <div>
          <h3 style={{"color": "green"}}>{e.message}</h3>
          <h3 style={{"color": "green"}}>Sending you to the Front Page in 3 seconds..</h3>
          </div>
      );

      }else{return '';}})
   )
  }
}

componentWillMount(){
  let strs = Buffer.from(`${this.props.match.params.key}`, 'base64').toString('ascii').split(" ")
  console.log(strs)

  addData({name: 'forgotPaswordPage'}, this.props.dispatch);

  this.setState({email: strs[1], key: strs[0]})
}


done(){

   setTimeout(function () {
    document.location = 'http://localhost:3333';
  }, 3000);

}

render(){

  return(
  <div style={{"margin": "300px"}}>


    <div className="landingPageModal"  id="loginModal">


        <div className="landingPageModalMain" style={{"borderRadius": "25px", "borderStyle": "solid", "borderColor": "grey", "borderShadow": "inset 0 0 10px #000000"}}>

          <div className="landingPageModalInputContainer">
            <h1>Ut oh, you forgot your password again..</h1>
            <h3>Enter a new password:</h3>

            {this.loadMessage()}

              <div className="flexContainerRow" style={{"marginBottom": "5%"}}>
                <i className="material-icons" style={{"backgroundColor":"white", "border": "none"}}>lock</i>
                <input className="landingPageInput" type="password" id="email" name="email" onChange={this.passwordChange} placeholder="New Password"></input>
              </div>

              <div className="flexContainerRow" style={{"marginBottom": "5%"}}>
                <i className="material-icons" style={{"backgroundColor":"white", "border": "none"}}>check_circle</i>
                <input className="landingPageInput" type="text" id="email" name="email" onChange={this.passwordCheckChange} placeholder="Password Check"></input>
              </div>


            <button className="profileButton" id="blueButton" onClick={this.processForgotPassword} style={{"fontSize": "x-large", "height": "50px", "width": "150px", "margin": "10%"}}>Submit</button>

              <div>
                  {this.state.badPassword ? <div style={{"color": "red"}}><h2>Passwords do not match</h2></div> : ''}
              </div>

              {this.props.data.some(e => e.name === 'forgotPassword' ? this.done() : '')}
          </div>
        </div>
    </div>
  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( ForgotPasswordPage );
