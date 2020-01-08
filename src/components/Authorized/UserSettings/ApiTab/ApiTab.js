import React, {Component} from 'react'
import { connect } from "react-redux";

import {doNewApiKey,doProfileChange} from '../../../../store.js';


class ApiTab extends Component {

  constructor(props){
    super(props)

    this.state = {}

    this.generateApiKey = this.generateApiKey.bind(this);

  }


componentWillMount(){}

componentWillUpdate(){
  //doProfilePage({name: 'settings'}, this.props.dispatch)
//  removeData('userData',this.props.dispatch)



  this.props.data.forEach(e => {
    if(e.name === 'settingsUpdate'){
      console.log(e.name)
    }
  })

}


generateApiKey(){

  doProfileChange({name: 'newapikey'},this.props.dispatch);

}

render(){

  console.log(this.props.data)

  return(
  <div>

    <h1>Api Tab</h1>


        {this.props.data.map(e => {
          if(e.name === 'userData'){
            return(
              <h3>Current Api Key: {e.apiKey}</h3>
            )
          }
        })}

      <button id="api" onClick={this.generateApiKey}>Generate New Key</button>

  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( ApiTab );
