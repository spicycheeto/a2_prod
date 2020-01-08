import React, {Component} from 'react'
import { connect } from "react-redux";

import { doProfileChange,doProfilePage,removeData } from '../../../../store.js';


class ProfileTab extends Component {

  constructor(props){
    super(props)

    this.state = {email: null, password: null, passwordCheck: null}

    this.submitPasswordChange = this.submitPasswordChange.bind(this);
    this.submitEmailChange = this.submitEmailChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
  }

  submitPasswordChange(){

    doProfileChange({name: 'passwordChange', password: this.state.password, passwordCheck: this.state.passwordCheck},this.props.dispatch)
  }

  submitEmailChange(){

    this.removeMessages();
    doProfileChange({name: 'emailChange', email: this.state.email}, this.props.dispatch)
  }

    emailChange(event) {

      this.setState({
        email: event.target.value
      })
    }

    passwordChange(event) {
      console.log(" password() ")
      this.setState({
        password: event.target.value
      })
    }


    passwordCheck(event) {
      this.setState({
        passwordCheck: event.target.value
      })
    }




render(){

  return(
    this.props.data.map(data => {

      if(data.name === 'userData'){

        return(
        <div className="pageContainer" style={{"paddingTop": "0px"}}>

          <div className="pageRow" style={{"justifyContent": "center", "alignItems": "center"}}>

            {this.props.data.map(e => {
              if(e.name === "settingsUpdate"){
                return <h1 style={{"color": "green"}}>{e.message}</h1>
              }
              if(e.name === "Fail"){
                return <h1 style={{"color": "red"}}>{e.message}</h1>
              }
            })}

          </div>

          <div className="pageRow" style={{"justifyContent": "center", "alignItems": "center"}}>
           <i className="material-icons" style={{"fontSize": "40px" }}>email</i>{data.email}
             <input type="text" onChange={this.emailChange} style={{"marginLeft": "50px"}} placeholder="New Email"/>
             <button type="submit" onClick={this.submitEmailChange} disabled>Change Email</button>
          </div>

          <div className="pageRow" style={{"justifyContent": "center", "alignItems": "center"}}>
            <i className="material-icons" style={{"fontSize": "40px"}}>lock</i>
            <input type="password" onChange={this.passwordChange} style={{"marginLeft": "25px"}} placeholder="New Password"/>
            <input type="password" onChange={this.passwordCheck} style={{"marginLeft": "25px"}} placeholder="Confirm Password"/>
            <button type="submit" onClick={this.submitPasswordChange}>Change Password</button>
          </div>

        </div>
      )}
    })
  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( ProfileTab );
