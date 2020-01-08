import React, {Component} from 'react'
import { connect } from "react-redux";


class DisplayShopProducts extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }



render(){
console.log("DisplayShowProducts")

  return(
    <div className="pageColumn" style={{"fontSize": "12px", "height": "600px", "width": "30%","justifyContent":"flex-start", "alignItems": "center", "borderRight": "solid", "overflowY": "scroll"}}>
    {this.props.products.length > 0 ? <div className="plusSign" onClick={this.props.handleNewProductClick}>+</div> : ''}
      {this.props.products.map( (e,index) => {

        return (
          <div className="cardThumbEdit" id={e.name} onClick={this.props.handleProductClick} style={{"width": "90%"}}>
            <img  className="cardThumb" id={e.name} onClick={this.props.handleProductClick} style={{"height": "100px", "width": "100px", "padding": "5px"}} src={"./content/images/cards/"+e.path} />
            <span id={e.name} onClick={this.props.handleProductClick}>{e.name}</span>
          </div>
        )

      })}


    </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( DisplayShopProducts );
