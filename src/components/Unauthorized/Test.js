import React, {Component} from 'react'
import { connect } from "react-redux";


import './test.css'

class Test extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/


/*
<div  style={{"display": "flex", "background": "url(/content/images/LaosImage2.png) no-repeat",
"background-size": "cover",

"margin-top": "200px",
"margin-bottom": "200px",
"height": "100%", "width": "100%", "max-height": "400px", "max-width": "700px"}}  title="LaosImage">


</div>
*/
render(){

  return(



    <div className="productCard">


      <img  className="productCardImage" src='/content/images/LaosImage2.png' />



      <div className="priceInnerDiv">
      <p>Take a one day tour in the city with local guide that knows all the best spots!</p>

        <h3>$200 / 2 persons </h3>

        <div className="viewDeals">
          View Deals >>
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



export default connect( mapStateToProps )( Test );
