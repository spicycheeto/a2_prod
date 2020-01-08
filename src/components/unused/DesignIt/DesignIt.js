import React, {Component} from 'react'
import { connect } from "react-redux";




class DesignIt extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/



render(){

  return(
    <div className="PageContainer" style={{"marginTop": "200px", "height": "100%", "width": "100%"}}>


    <h1>Design It</h1>

  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( DesignIt );
