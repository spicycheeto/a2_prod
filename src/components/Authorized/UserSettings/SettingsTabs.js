import React, {Component} from 'react';
import { connect } from "react-redux";

import { removeData } from '../../../store.js';

import SecurityTab from './SecurityTab/SecurityTab.js';
import ProfileTab from './ProfileTab/ProfileTab.js';
import ApiTab from './ApiTab/ApiTab.js';

class SettingsTabs extends Component {

  constructor(props){
    super(props)

    this.state = {tab: "profile"}

    this.handleTabClick = this.handleTabClick.bind(this);


  }




componentWillUnmount(){
  this.removeMessages();
}

removeMessages(){
  this.props.data.map(e => {
    if(e.name === "settingsUpdate"){
      removeData('settingsUpdate', this.props.dispatch)
    }
    if(e.name === "Fail"){
      removeData('Fail', this.props.dispatch)
    }
  })
}

loadTab(){

  switch(this.state.tab) {

    case "profile": {
      return this.profileTab();
    }

    case "security": {
      return this.securityTab();
    }

    case "accounts": {
      return this.accountTab();
    }

    case "api": {
      return this.apiTab();
    }
    default: '';
  }
}

handleTabClick(event){
this.removeMessages();
this.setState({tab: event.target.id})

}


apiTab(){


  return(<ApiTab />)
}

profileTab(){


  return(<ProfileTab />)
}

securityTab(){

  return( <SecurityTab /> )

}
accountTab(){

  let data;
    this.props.data.forEach(e => {

      if(e.name === 'userData'){
        data = e;
      }
    })

  return (
    <div className="pageContainer">
      {data.accounts ? 'map accounts' : 'No connected bank accounts'}
      <h1>Add New Card</h1>
        <input type="text" placeholder="Card Number"/>

    </div>
  )
}



render(){



  return(
    <div >

      <div className="w3-bar w3-black">
        <button className="w3-bar-item w3-button" id="profile"  onClick={this.handleTabClick}>User Profile</button>
        <button className="w3-bar-item w3-button" id="security" onClick={this.handleTabClick}>Security</button>
        <button className="w3-bar-item w3-button" id="accounts" onClick={this.handleTabClick}>Accounts</button>
        <button className="w3-bar-item w3-button" id="api" onClick={this.handleTabClick}>Api</button>


      </div>

      {this.loadTab()}

    </div>

    )


  }
}


const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}


export default connect( mapStateToProps )( SettingsTabs );
