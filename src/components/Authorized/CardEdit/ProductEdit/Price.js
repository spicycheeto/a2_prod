import React, {Component} from 'react'
import { connect } from "react-redux";


class Price extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/

componentDidUpdate(){

  if(this.props.newProductEdit){
    document.getElementById('productPrice').value = "Product Price"

  }else{
    document.getElementById('productPrice').value = this.props.currentItem.price
  }
}

render(){

  return(
    <div className="PageContainer" style={{"marginTop": "200px", "height": "100%", "width": "100%"}}>


    <input type="number" id="productPrice" placeholder={this.props.currentItem.price}/>

  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( Price );
