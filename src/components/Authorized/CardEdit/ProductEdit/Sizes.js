import React, {Component} from 'react'
import { connect } from "react-redux";


class Sizes extends Component {

  constructor(props){
    super(props)

    this.state = {sizes: ["S","M","L","XXL"]}

    this.displaySizeButtons = this.displaySizeButtons.bind(this)
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/


handleClick(event){
  if(document.getElementById(event.target.id).className === "editSizeButton"){
    document.getElementById(event.target.id).className = "editSizeButtonPushed";
  }else{
    document.getElementById(event.target.id).className = "editSizeButton";
  }
}

displaySizeButtons(){

  if(this.props.newProductEdit){

      this.state.sizes.map(e => {
        document.getElementById(`size-${e}`).className = "editSizeButton";
      })

  }else{
    this.state.sizes.map(e => {
      if(document.getElementById(`size-${e}`) && this.props.currentItem['productAttributes'].sizes.some(size => size === e) ){
       document.getElementById(`size-${e}`).className = "editSizeButtonPushed";
     }else{
       if(document.getElementById(`size-${e}`) ){
         document.getElementById(`size-${e}`).className = "editSizeButton";
       }
     }
    } )
  }
}

render(){


  return(
    <div className="rowCentered">
    <button  className="editSizeButton" id="size-S" onClick={this.handleClick}>S</button>
    <button  className="editSizeButton" id="size-M" onClick={this.handleClick}>M</button>
    <button  className="editSizeButton" id="size-L" onClick={this.handleClick}>L</button>
    <button  className="editSizeButton" id="size-XXL" onClick={this.handleClick}>XXL</button>
    { this.displaySizeButtons() }

  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( Sizes );
