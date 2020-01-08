import React, {Component} from 'react'
import { connect } from "react-redux";


class Colors extends Component {

  constructor(props){
    super(props)
    this.state = {colors: ["red", "blue", "black"]}

    this.displayColorButtons = this.displayColorButtons.bind(this)
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/

handleClick(event){
  if(document.getElementById(event.target.id).className === "colorButton"){
    document.getElementById(event.target.id).className = "colorButtonPushed";
  }else{
    document.getElementById(event.target.id).className = "colorButton";
  }
}

displayColorButtons(){

  if(this.props.newProductEdit){

    this.state.colors.map(e => {
      document.getElementById(`color-${e}`).className = "colorButton";
    })
  }else {
    this.state.colors.map(e => {
      if(document.getElementById(`color-${e}`) && this.props.currentItem['productAttributes'].colors.some(color => color === e) ){
       document.getElementById(`color-${e}`).className = "colorButtonPushed";
     }else{
       if(document.getElementById(`color-${e}`) ){
         document.getElementById(`color-${e}`).className = "colorButton";
       }
     }
    } )
  }

}


render(){


  return(

    <div>
      <button  className="colorButton" id="color-red" style={{ "background": "red" }} onClick={this.handleClick} />
      <button  className="colorButton" id="color-blue" style={{ "background": "blue" }} onClick={this.handleClick} />
      <button  className="colorButton" id="color-black" style={{ "background": "black" }} onClick={this.handleClick} />
      {this.displayColorButtons()}
    </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( Colors );
