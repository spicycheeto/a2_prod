import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React, {Component} from 'react';
import {addData, removeData} from '../../store';



let globalDispatch;
let globalData;
let globalCartData;

function mapProps(dispatch,data,cartData){
  globalDispatch = dispatch;
  globalData = data;
  globalCartData = cartData;
}

//style={{"height": "50px", "width": "50px", "padding": "5px"}}
const Header = ( { loggedIn,data,cart, dispatch } ) => (



    <div className="navbar">

      {mapProps(dispatch,data,cart)}


      <div className="headerFlexbox" id="header" style={{"justifyContent": "space-around"}}>

      <div className="flexContainerVertical" style={{"fontSize": "20px", "justifyContent": "center", "alignItems": "center"}}>
          <img className="socialMediaImage" src="./content/images/header/facebook_icon_small.png" />
          <img className="socialMediaImage" src="./content/images/header/instagram_icon_small.png" />
          <img className="socialMediaImage" src="./content/images/header/twitter_icon_small.png" />

      </div>

        <div>
          <Link to="/"><h3 id="companyName">A2 Design Solutions</h3></Link>
        </div>
          { data.some(e => e.name === "forgotPaswordPage" || e.name === "verificationPage") ? '' : loadHeaderLinks() }

      </div>
    </div>

);

function loadHeaderLinks() {

  return(
  <div className="headerFlexbox">
    <div className="shoppingCartImage">
    <Link to='/shoppingCart'>
      <img  className="shoppingCart" onClick={function(){console.log('click')}}  src="./content/css/Header/Live/light_Shopping_Cart.png" />
      <span id="cartItemAmount">{globalCartData.length}</span>
    </Link>
    </div>

    <div className="shoppingCartImage">
    <Link to='/login'>
      <img  className="shoppingCart" onClick={function(){console.log('click')}}  src="./content/css/Header/Live/loginarrow.png" />
    </Link>
    </div>

  </div>
  )
}


function handleLoginClick() {

  if(globalData.some(e => e.name === 'signupModal')){
    removeData('signupModal',globalDispatch)
  }

  return addData({name: 'loginModal'}, globalDispatch)
}

function handleSignupClick() {
console.log('handlesignupclick()')
  if(globalData.some(e => e.name === 'loginModal')){
    removeData('loginModal',globalDispatch)
  }

return  addData({name: 'signupModal'}, globalDispatch);

}

const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
     data: state.data,
     cart: state.cart,
} );

export default connect( mapStateToProps )( Header );
