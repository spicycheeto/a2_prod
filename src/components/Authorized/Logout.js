import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { doLogout } from "../../store";
import {removeCookie} from "../../api.js";



class Logout extends Component {

  constructor(props){
    super(props)

    this.state = {}

    this.logout = this.logout.bind(this);
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/



logout(){
  doLogout(this.props.dispatch);

    document.location = 'http://192.168.111.151:3333';

}


    render(){

      return(
      <div className="dropDownItem" onClick={this.logout}>
        Log Out
      </div>

      )
    }
  }



const mapDispatchToProps = {


}

const mapStateToProps = ( state ) => ({

  loggedIn: state.loggedIn

});




export default connect(mapStateToProps)(Logout);
