



import React, {Component} from 'react'
import { connect } from "react-redux";


class DetailedDescription extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/
componentDidUpdate(){

  if(!this.props.newProductEdit){
  document.getElementById('detailedDescription').value = this.props.currentItem['detailedDescription']

  }else{
    document.getElementById('detailedDescription').value = "Enter a detailed description of your product here. This text will be displayed in the body of the item display page, underneath the photos and brief description. 10 - 20 sentences should be fine."

  }
 }


render(){

  return(
    <div className="PageContainer" style={{"marginTop": "200px", "height": "100%", "width": "100%"}}>


    <h4>Detailed Description:</h4>
    <hr/>
    <textarea id="detailedDescription" className="textArea" rows="4" cols="50">
    At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies.
    </textarea>

  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( DetailedDescription );
