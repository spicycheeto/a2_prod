
import React from "react";
import { connect } from "react-redux";
import {removeData} from '../../store';
import {test} from '../../api.js'
import Login from './Login.js';
import ForgotPassword from './ForgotPassword.js';

import LandingRoutes from './LandingPage/LandingRoutes.js';
import LandingColumns from './LandingPage/LandingColumns.js';

import { Route, Redirect } from 'react-router'


class UnauthorizedLandingPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {

      loginModal: false,
      signupModal: false,
      forgotPassword: false,
    }

    this.displayLoginModal = this.displayLoginModal.bind(this);
    this.setForgotPassword = this.setForgotPassword.bind(this);
  }

  componentWillMount(){
    //store cleanup
    //this component mounts after login:
    this.props.data.filter(e => {
      if(e.name === 'justLoggedOut'){
        removeData('justLoggedOut',this.props.dispatch)
      }
    })
  }

setForgotPassword(){

  this.state.forgotPassword ? this.setState({forgotPassword: false, loginModal: false}) : this.setState({forgotPassword: true})
}


displayLoginModal(){
  console.log('displayLoginModal()')
  return <Login setForgotPassword={this.setForgotPassword}/>

}

display(){


if(this.props.data.some(e => e.name === 'loginModal') || this.props.data.some(e => e.name === 'signupModal')){
  return(this.displayLoginModal())
}

if(!this.props.data.some(e => e.name === 'loginModal') && !this.props.data.some(e => e.name === 'signupModal')){

    return(
//style={{"marginTop": "200px", "height": "100%", "width": "100%"}}
    <div className="primaryContainer" >

      <LandingRoutes history={this.props.history}/>
      <LandingColumns />

    </div>
  )
 }
}

testButton(){
  return test();
}
//Background Image:
//<img style={{"width": "100%", "height": "100%"}} src="./content/backgroundImg.png" />

    render( ) {
console.log('landingpage');
console.log(this.props);

        return (
            <div>
             {this.state.forgotPassword ? <ForgotPassword setForgotPassword={this.setForgotPassword}/> : this.display()}
             <button id="testbutton" onClick={this.testButton}>click me</button>
            </div>
        );
    }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
    cart: state.cart,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( UnauthorizedLandingPage );
