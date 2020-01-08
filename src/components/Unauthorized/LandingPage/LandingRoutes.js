import React, {Component} from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Route, Redirect } from 'react-router'

import './LandingPage.css';


class LandingRoutes extends Component {

  constructor(props){
    super(props)

    this.state = {}


  }

  /*Second Button
   <div>
    <Link to="DesignIt"><button  onClick={this.handleDesignItClick} style={{"borderStyle": "solid","borderColor": "#ff637e", "backgroundColor":"#3b66e7","borderWidth": "thick", "fontFamily": "Special Elite, cursive","fontSize": "50px", "height": "150px", "width": "350px","color": "white", "cursor": "pointer"}} >Design It!</button></Link>
  </div>
  */

render(){

  return(
  <div>

   <div className="landingRoutesColumn" >
   <p id="titleParagraph" >React, Express.js, RedisDB Login Portal Demo</p>
  </div>



  <div className="landingRoutesRow" >
      <div>
          <Link to="ShopDisplay"><button className="landingPageButton" onClick={this.handleChooseItClick} >Choose It!</button></Link>
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



export default connect( mapStateToProps )( LandingRoutes );
