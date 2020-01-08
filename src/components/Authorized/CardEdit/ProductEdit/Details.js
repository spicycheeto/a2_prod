import React, {Component} from 'react'
import { connect } from "react-redux";


class Details extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }


componentDidUpdate(){



  if(!this.props.newProductEdit){
  document.getElementById('productAttribute-0').value = this.props.currentItem.details[0]
  document.getElementById('productAttribute-1').value = this.props.currentItem.details[1]
  document.getElementById('productAttribute-2').value = this.props.currentItem.details[2]
  document.getElementById('productAttribute-3').value = this.props.currentItem.details[3]

  }else{

    document.getElementById('productAttribute-0').value = "Product feature or blank"
    document.getElementById('productAttribute-1').value = "Product feature or blank"
    document.getElementById('productAttribute-2').value = "Product feature or blank"
    document.getElementById('productAttribute-3').value = "Product feature or blank"
  }
}

displayDetailInput(newProduct){}

render(){


  return(
    <div className="detailsBox">

    <span>
    {this.props.currentItem.details.map( (e,index) => {
      return ( <p>Includes Item: <input type="text" id={"productAttribute-"+index} onChange={this.props.handleDetailsChange}  placeholder={e}/></p> )
    })} </span>
    </div>
    )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( Details );
