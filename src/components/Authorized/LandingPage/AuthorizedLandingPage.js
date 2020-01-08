import React, {Component} from 'react'
import { connect } from "react-redux";


class AuthorizedLandingPage extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/



render(){

  return(
  <div className="PageContainer" style={{"marginTop": "200px"}}>

    <h1>AuthorizedLandingPage Component</h1>


  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( AuthorizedLandingPage );
