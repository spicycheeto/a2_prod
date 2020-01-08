import React, {Component} from 'react'
import { connect } from "react-redux";


import {doTwoFaAuth} from '../../../store.js';

class TwoFactorAuth extends Component {

  constructor(props){
    super(props)

    this.state = {token: '', badToken: false}


    this.tokenChange = this.tokenChange.bind(this);
    this.loadMessage = this.loadMessage.bind(this);
    this.process2faAuth = this.process2faAuth.bind(this);

  }


process2faAuth(){

  //check input is a 6 digit integer
  //retrieve 2fa session key from store.
  //dispatch token and session key to server

  this.props.data.forEach(e => {
    console.log('process2fa')
    if(e.name === 'accountVerification'){
        console.log('process2fa****')
      doTwoFaAuth({token: this.state.token, key: e.twofaSessionKey}, this.props.dispatch)
    }
  })

}


tokenChange(event){

  this.setState({
    token: event.target.value
  })
}

done(){

   setTimeout(function () {
    document.location = 'http://localhost:3333/';
  }, 3000);

}

loadMessage(){

  if(this.props.data.some(e => e.name === 'Fail')){
    return (this.props.data.map(e => {
      if(e.name === 'Fail'){

        return (<h3 style={{"color": "red"}}>{e.message}</h3>);

      }else{return '';}})
   )
  }

  if(this.props.data.some(e => e.name === 'twofaSuccess')){
    return (this.props.data.map(e => {
      if(e.name === 'twofaSuccess'){

        return (
          <div>
          <h3 style={{"color": "green"}}>{e.message}</h3>
          <h3 style={{"color": "green"}}>Success, loading in 3 seconds..</h3>
          </div>
      );

      }else{return '';}})
   )
  }

}

render(){


console.log(this.props.data)


  return(

    <div style={{"margin": "300px"}}>


      <div className="landingPageModal"  id="loginModal">


          <div className="landingPageModalMain" style={{"borderRadius": "25px", "borderStyle": "solid", "borderColor": "grey", "borderShadow": "inset 0 0 10px #000000"}}>

            <div className="landingPageModalInputContainer">
              <h1>Two Factor Authentication</h1>
              <h3>Please enter your token below</h3>

              {this.loadMessage()}

                <div className="flexContainerRow" style={{"marginBottom": "5%"}}>
                  <i className="material-icons" style={{"backgroundColor":"white", "border": "none"}}>lock</i>
                  <input className="landingPageInput" type="text" id="twofaToken" name="email" onChange={this.tokenChange} placeholder="6 digit code (ex: 643 345)"></input>
                </div>


              <button className="profileButton" id="blueButton" onClick={this.process2faAuth} style={{"fontSize": "x-large", "height": "50px", "width": "150px", "margin": "10%"}}>Submit</button>

                <div>
                    {this.state.badToken ? <div style={{"color": "red"}}><h2>Passwords do not match</h2></div> : ''}
                </div>

                {this.props.data.some(e => e.name === 'twofaSuccess' ? this.done() : '')}
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



export default connect( mapStateToProps )( TwoFactorAuth );
