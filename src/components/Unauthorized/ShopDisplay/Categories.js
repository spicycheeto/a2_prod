import React, {Component} from 'react'
import { connect } from "react-redux";
import './ShopDisplay.css';

class Categories extends Component {

  constructor(props){
    super(props)

    this.state = {}


    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }


handleCategoryClick(event){

  this.props.handleTabClick(event.target.title);


}

componentDidMount(){
  this.categories.addEventListener('wheel', this.handleScroll );
}

handleScroll(event){
  console.log(this.categories.scrollTop)
}

render(){



  return(

    //was: className=pageColumn (app.css)
   <div className="categoriesPageColumn" ref={elem => this.categories = elem} >

   <div className="categoriesPageRow" id="searchRow"  >

    <span>
      <div className="categoriesDiv" id="categories">


      <div className="categoriesItem clickable" id="All" title="All" onClick={this.handleCategoryClick} >
        <h4 title="All">All</h4>
      </div>

        {this.props.categoryState.map( (categoryString, index) => {

        return(
          <div className="categoriesItem clickable" title={categoryString} onClick={this.handleCategoryClick} >
            <h4 title={categoryString}>{categoryString}</h4>
          </div>
         )
        })}
      </div>
    </span>

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

export default connect( mapStateToProps )( Categories );
