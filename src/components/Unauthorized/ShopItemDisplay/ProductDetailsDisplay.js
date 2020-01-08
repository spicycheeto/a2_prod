import React, {Component} from 'react'
import { connect } from "react-redux";


class ProductDetailsDisplay extends Component {

  constructor(props){
    super(props)

    this.state = {}

    this.displayDetails = this.displayDetails.bind(this);
  }

  displayDetails(){

    if(Array.isArray(this.props.productObj.details)){

    return(
      <div>
      <h4>Included:</h4>
      <ul className="includedList">
      {this.props.productObj.details.map( (e,index) => {
        return <li id={index} >{e}</li>
      })}
      </ul>
      </div>
    )
    }
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/

//{this.props.productObj['productAttributes'].description}
render(){



  return(
    <div className="detailsColumn">


    <h1>{this.props.productObj.name}</h1>
      <h3>Price: ${this.props.productObj.price}</h3>
      <p>
         {this.props.productObj.briefDescription}
      </p>

    {this.displayDetails()}





  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
    cart: state.cart,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( ProductDetailsDisplay );
