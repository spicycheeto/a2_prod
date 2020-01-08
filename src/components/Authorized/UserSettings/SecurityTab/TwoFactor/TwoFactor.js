import React, {Component} from 'react';
import { connect } from "react-redux";
import { doProfileChange,doProfilePage,removeData,addData } from '../../../../../store.js';


var QRCode = require('qrcode');
var speakeasy = require('speakeasy');


class TwoFactor extends Component {

  constructor(props){
    super(props)

    this.state = {twofaSignupToken: ''}

    this.handle2faDisable = this.handle2faDisable.bind(this);
    this.handle2faSignupInput = this.handle2faSignupInput.bind(this);
    this.handle2faSignup = this.handle2faSignup.bind(this);

}



handle2faSignupInput(event){

    this.setState({twofaSignupToken: event.target.value})
}


handle2faSignup(){
  //verify the token is valid and dispatch signup
  this.props.data.forEach(e => {
    if(e.name === "userData"){

      let token = speakeasy.totp({
        secret: Buffer.from(e.twofaSecret, 'hex'),
        encoding: 'hex',
      })

      if(this.state.twofaSignupToken === token){
        this.props.forceRemoveModal();
        doProfileChange({name: "twofaSignup", twofaSecret: e.twofaSecret}, this.props.dispatch);
        doProfilePage(this.props.dispatch);

      }else{
        addData({"name": "settingsUpdate", "message": "Incorrect Token"},this.props.dispatch)
      }
    }
  })
}



handle2faDisable(){
  this.props.forceRemoveModal();
  doProfileChange({name: "twofaDisable"}, this.props.dispatch);
  doProfilePage(this.props.dispatch);

}


loadModal(){

  return(
    this.props.data.map(e => {

      if(e.name === "userData"){
        if(e.twofa){
          let url = e.twofaImgUrl;
          let secret = e.twofaSecret;
          return(

            <div className="landingPageModal" id="2fa" onClick={this.props.hideModal} style={{"opacity": "1", "zIndex": "1"}}>

                <div className="landingPageModalMain" style={{"backgroundColor": "black", "width": "50%"}} >



                  <div className="landingPageModalInputContainer" style={{ "justifyContent": "center", "alignItems": "center"}}>


                    <h2 style={{"color": "white"}}>2fa Has been enabled. You will see an additional check during login</h2>

                      <div className="flexContainerRow" style={{"margin": "100px"}}>

                          <button className="profileButton" id="blueButton" onClick={this.handle2faDisable} style={{"fontSize": "x-large", "height": "50px", "width": "100%"}}>Disable 2fa</button>
                          <h2 style={{"color": "red"}}>Disabling 2fa is not recommended unless you need to create a new secret.</h2>
                      </div>
                  </div>
                </div>
            </div>
          )

        }else{
          let url = e.twofaImgUrl;
          let secret = e.twofaSecret;
          return(
          <div className="landingPageModal" id="2fa" onClick={this.props.hideModal} style={{"opacity": "1", "z-index": "1"}}>

              <div className="landingPageModalMain" style={{"backgroundColor": "black", "width": "50%"}} >


                <div className="landingPageModalInputContainer" style={{ "justifyContent": "center", "alignItems": "center"}}>

                {this.props.data.map(e => {

                  if(e.name ==='settingsUpdate'){
                    return (<h2 style={{"color": "red"}}>{e.message}</h2>)
                  }

                })}

                  <img src={url} />
                  <h5 style={{"color": "white"}}>{secret}</h5>

                    <div className="flexContainerRow" style={{"margin": "100px"}}>
                      <input type="text" id="twofaSignupToken" onChange={this.handle2faSignupInput} placeholder="Token"/>
                        <button className="profileButton" id="blueButton" onClick={this.handle2faSignup} style={{"fontSize": "x-large", "height": "50px", "width": "100%"}}>Activate 2fa</button>

                    </div>
                </div>
              </div>
          </div>
          )
        }
      }
    }))
}


render(){
  console.log('TwoFactor')
  console.log(this.props.data)
  return(
  <div>

    {this.loadModal()}

  </div>

  )
 }
}


const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( TwoFactor );



/*



*/
