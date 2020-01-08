import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React, {Component} from 'react';

import BadPage from '../Unauthorized/BadPage';
import Logout from './Logout';

const Header = ( { loggedIn, username } ) => (

      <div className="navbar">

          <div className="headerFlexbox">

            <img  style={{"marginLeft": "130px"}}src="./content/logo.png" />

            <Link to='/CardEdit'>Add/Remove Cards</Link>
            <div className="headerLinks">

                <div className="dropdown">
                  <div className="flexContainerVertical" style={{"fontSize": "20px", "justifyContent": "center", "alignItems": "center"}}>
                  <i className="material-icons" style={{"fontSize": "40px"}}>account_box</i>
                  <span>  Welcome, {username}</span>
                  <i className="material-icons" style={{"fontSize": "40px"}}>keyboard_arrow_down</i>
                  </div>
                  <div className="dropdown-content">
                    <div className="flexContainerVertical">
                      <div className="dropDownItem"><Link to="/UserSettings"><h4>Account Settings</h4></Link></div>
                      <Logout />
                    </div>
                  </div>
                </div>

            </div>

          </div>

      </div>

);



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    username: state.username
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps,mapDispatchToProps )( Header );
