import React, {Component} from 'react'
import { connect } from "react-redux";

import './LandingPage.css'


class LandingColumns extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/


//    <p style={{"fontFamily": "Special Elite, cursive","fontSize": "50px"}}>Design Your Own T-Shirts, Hats, Logo's and Much More!</p>
/*
<div className="landingColumnsRowContainer" >
</div>
*/
render(){

  return(


  <div className="landingColumnsContainer">

    <div className="landingColumn1">


    <p id="columnParagraph">
    <u> <b> Bring Your ideas to life </b> </u> <br /> <br />

    Create a professional and unique design for your company, group, school, team, or event! If you prefer, we can design it for you.
    We have thousands of layouts!

    Use school mascots or company logos for your design. Or choose from artwork for any occasion like sports, school, fashion, and work!


    </p>

    <p id="columnParagraph">
      <u> <b> Send Us Your Artwork! </b> </u> <br />
      We can create custom transfers from just about anything you send us: sketches, photos, illustrations, etc.
      Just send us your artwork file and we will provide a quote or the option to place your order.
    </p>

    </div>

    <div className="landingColumn2">

    <p id="columnParagraph">
    <u><b>Graphic Designs and Prints</b></u> <br /> <br />

        A2 Design Solutions is much more than a t-shirt company.
        We create custom:
        <ul>
         <li>Sweat shirts</li>
         <li>Uniforms</li>
         <li>Hats</li>
         <li>Stickers</li>
         <li>Banners</li>
         <li>Wall Graphics</li>
        </ul>

      </p>

    <p id="columnParagraph">
     Special Occasions and Fund Raising Events <br />
      From a family reunion trip to Disney World to a corporate event, A2 Design Solutions design the promotional materials including corporate shirts, signs, banners, mugs
      and much more!
    </p>

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


/*
<div className="footerRow" >
  <div>
    <p>A2 Design Solutions</p>
    <ul style={{"listStyleType": "none"}}>
    <li>Phone: +1 (240) 607-2524</li>
    <li>Cell: +1 (703) 953-6185</li>
    <li>Email: anitaaldord@gmail.com</li>
    </ul>

  </div>
</div>
*/
export default connect( mapStateToProps )( LandingColumns );
