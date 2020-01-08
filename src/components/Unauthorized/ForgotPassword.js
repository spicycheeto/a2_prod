import React, {Component} from 'react'
import { connect } from "react-redux";
import {removeData,forgotPasswordEmail} from '../../store.js'



class ForgotPassword extends Component {

  constructor(props){
    super(props)

    this.state = {
      email: 'default',
    }

    this.hideModal = this.hideModal.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.processNewPasswordRequest = this.processNewPasswordRequest.bind(this);
  }



    emailChange(event) {

      this.setState({
        email: event.target.value
      })
    }


hideModal(event){
  console.log('hidemodal')
    removeData(event.target.id, this.props.dispatch)
    this.props.setForgotPassword()
  }

processNewPasswordRequest(){
  forgotPasswordEmail(this.state, this.props.dispatch)
}


loadMessage(){

    return (this.props.data.map(e => {
      if(e.name === 'forgotPassword'){

        return (<h3 style={{"color": "green"}}>{e.message}</h3>);

      }else{return '';}})
  )
}

render(){

  return(
  <div>

    <div className="landingPageModal"  id="loginModal">

        <div className="landingPageModalMain" >

          <div className="landingPageModalInputContainer">
              <h3>Please enter the email address associated with your account.</h3>
              <br />


                {this.loadMessage()}


            <div className="flexContainerRow" style={{"marginBottom": "5%", "paddingTop": "50px"}}>
              <i className="material-icons" style={{"backgroundColor":"white", "border": "none"}}>email</i>
              <input className="landingPageInput" type="text" id="email" name="email" onChange={this.emailChange} placeholder="Email Or Username"></input>
            </div>
            <a href="#" onClick={this.hideModal}>Nevermind..</a>



            <button className="profileButton" id="blueButton" onClick={this.processNewPasswordRequest} style={{"fontSize": "x-large", "height": "50px", "width": "150px", "margin": "10%","width": "100%"}}>Request New Password</button>


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



export default connect( mapStateToProps )( ForgotPassword );
