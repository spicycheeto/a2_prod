



import React, {Component} from 'react'
import { connect } from "react-redux";


class BriefDescription extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/

componentDidUpdate(){

  if(!this.props.newProductEdit){
  document.getElementById('briefDescription').value = this.props.currentItem['briefDescription']

  }else{
    document.getElementById('briefDescription').value = "Enter a brief description of your product here. This text will be displayed in the upper right hand corner of the items display page, underneath the title. 3 to 6 sentences should be fine. "

  }
 }


render(){

  return(
    <div className="PageContainer" style={{"marginTop": "200px", "height": "100%", "width": "100%"}}>


    <h4>Brief Description:</h4>
    <hr/>
    <textarea id="briefDescription" className="textArea" placeHolder="Enter a brief description of your product here. This text will be displayed in the upper right hand corner of the items display page, underneath the title. 3 to 6 sentences should be fine." rows="4" cols="50">

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



export default connect( mapStateToProps )( BriefDescription );
