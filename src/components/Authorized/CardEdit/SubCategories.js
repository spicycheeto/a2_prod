import React, {Component} from 'react'
import { connect } from "react-redux";

import './SubCategories.css';

class SubCategories extends Component {

  constructor(props){
    super(props)

    this.state = {}

    this.handleAddNewCategory = this.handleAddNewCategory.bind(this)
    this.handleCategoryRemove = this.handleCategoryRemove.bind(this)
  }

  componentWillMount(){}

  componentWillUpdate(){
    document.getElementById("newCategoryInput").hidden = true;
  }

handleAddNewCategory(){
  return this.props.handleAddNewCategory({newCategoryName: document.getElementById("newCategoryNameInput").value});
}

displayNewCategoryOptions(){
  document.getElementById("newCategoryInput").hidden = false;

}

handleCategoryRemove(event){
  return this.props.handleCategoryRemove(this.props.categories[parseInt(event.target.id)])
}


render(){

  return(


    <div className="pageRow" id="categoryRow" >


        {this.props.categories.map( (category, index) => {

        return(
            <div className="columnCenter">
            <button className="subCategoryButton" id={category} onClick={this.props.handleSubCategoryClick}>{category}</button>
            <a href="#" className="removeCategoryButton" id={index} onClick={this.handleCategoryRemove} >remove</a>
            </div>
         )
        })}

        <div className="plusSign" onClick={this.displayNewCategoryOptions}>+</div>

        <div id="newCategoryInput" hidden>
          <p>Category Name:<input id="newCategoryNameInput" type="text" /></p>
          <button className="newCategorySubmit" onClick={this.handleAddNewCategory}>Add Category</button>
        </div>
   </div>




  )
}//<div className="box" id={category} onClick={this.props.handleSubCategoryClick} >
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}

export default connect( mapStateToProps )( SubCategories );
