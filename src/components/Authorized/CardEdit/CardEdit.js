import React, {Component} from 'react'
import { connect } from "react-redux";

import {removeData,getCardState,setCardState,getAllCardState,updateProduct,removeProduct, createProduct, addNewCategory,removeCategory} from '../../../store.js';

import DisplayShopProducts from './DisplayShopProducts.js';
import SubCategories from './SubCategories.js';
import ProductEdit from './ProductEdit/ProductEdit';

class CardEdit extends Component {

  constructor(props){
    super(props)

    this.state = { tabState: null, cards: [], categories: [], currentItem: {}, newProductEdit: false }

    this.loadCards = this.loadCards.bind(this)
  //  this.handleCardThumbClick = this.handleCardThumbClick.bind(this);
    this.handleSubCategoryClick = this.handleSubCategoryClick.bind(this)
    this.handleProductClick = this.handleProductClick.bind(this)
    this.handleNewProductClick = this.handleNewProductClick.bind(this)
    this.handleMessageRowClick = this.handleMessageRowClick.bind(this)
    this.handleUpdateProductClick = this.handleUpdateProductClick.bind(this)
    this.handleRemoveProductClick = this.handleRemoveProductClick.bind(this)
    this.handleCreateProductClick = this.handleCreateProductClick.bind(this)
    this.handleAddNewCategory = this.handleAddNewCategory.bind(this)
    this.handleCategoryRemove = this.handleCategoryRemove.bind(this)
  }



  componentWillMount(){
    console.log('cardEdit Mount')
     getAllCardState(this.props.dispatch)
 }

  componentWillUpdate(){
    console.log('cardEdit update')
  //  getAllCardState(this.props.dispatch)
  }


  handleSubCategoryClick(event){
  removeData("message", this.props.dispatch);
  this.props.data.forEach(e => {
    if(e.name === 'cardData'){
      let newCardState = JSON.parse(e.cards[event.target.id]);
      return this.setState({tabState: event.target.id, cards: newCardState, newProductEdit: false})
    }
  })
 }

 handleProductClick(event){
  removeData("message", this.props.dispatch);
  if(this.state.cards.some(e => e.name === event.target.id)){
   this.setState({currentItem: this.state.cards.filter(e => {
     if(e.name === event.target.id){
       return e;
     }
   })[0], newProductEdit: false })
   }
 }

 handleNewProductClick(){
   removeData("message", this.props.dispatch);
   this.setState( { newProductEdit: true } )
 }

 handleUpdateProductClick(newProduct){
   updateProduct( newProduct, this.props.dispatch )
   getAllCardState( this.props.dispatch, (err,result) => {
     return this.loadCards();
   } );
 }

 handleRemoveProductClick(currentItem){

   removeProduct(currentItem,this.props.dispatch);
   getAllCardState( this.props.dispatch, (err,result) => {
       console.log("CALLING loadCards()......")
     return this.loadCards();
   } );

 }

 handleCreateProductClick(newProduct){


   createProduct(newProduct, this.props.dispatch, (err,result) => {

     return this.loadCards();

   });
  //
 }

 handleAddNewCategory(newCategory){
   console.log('adding new category!')
   console.log(newCategory
   )
   addNewCategory(newCategory,this.props.dispatch);
   getAllCardState( this.props.dispatch, () => {
      console.log("CALLING loadCards()......")
     return this.loadCards();
   } );
 }

 handleCategoryRemove(categoryName){

   removeCategory({categoryName: categoryName},this.props.dispatch);

   this.props.data.map(e => {

     if(e.name === 'cardData'){
      // if(Object.keys(e.cards).length === 1){
      if(this.state.categories.length === 1){
         removeData("cardData", this.props.dispatch); //we just removed the last element in our cards object. Remove cardData because there is none.
         return this.setState({
           tabState: null,
           cards: [],
           categories: [],
           currentItem: {},
         })
       }else{
         let firstKey = Object.keys(e.cards)[0];
         //console.log(Object.keys(e.cards)[0])
         //console.log(this.state.categories.filter(e => e !== categoryName))
        /// console.log(JSON.parse(e.cards[firstKey])[0])
         return this.setState({
           tabState: Object.keys(e.cards)[0],
           categories: this.state.categories.filter(e => e !== categoryName),
           currentItem: JSON.parse(e.cards[firstKey])[0],
         })
       }
     }

   })

 }


  loadCards(){

  if(this.props.data.some(e => e.name === 'cardData') ){
    this.props.data.forEach(e => {
      if(e.name === 'cardData'){
        let cardsArr = Object.keys(e.cards);
        if(this.state.tabState === null){
          this.setState({tabState: cardsArr[0], newProductEdit: false,})
        }else{
      //  if(cardsArr.length >= 1){
          if(JSON.parse(e.cards[this.state.tabState]).length > 0){
          return this.setState({
            cards: JSON.parse(e.cards[this.state.tabState]),
            categories: Object.keys(e.cards),
            currentItem: JSON.parse(e.cards[this.state.tabState])[0],
            newProductEdit: false,
          });
        }
      }



      }
    })
  }else{
    return(
      <p>
      <h4>Looks like we haven't added any products yet! Add your first product by clicking the add category button to the right -> </h4>
      </p>
    )
  }
}


handleMessageRowClick(e){
  return removeData("message", this.props.dispatch);
}


render(){


  console.log('******carEdit*******')
//  {this.errorCheck()}
  return(

    <div className="pageContainer" style={{"height": "100%", "width": "100%", "justifyContent": "center", "alignItems": "center"}}>
    <div className="messageRow" onClick={this.handleMessageRowClick}>
      {this.props.data.map(e => {
        if(e.name === "message"){
          return <h4>{e.message}</h4>
        }
      })}


    </div>

      <div className="pageRow" >
      { this.state.currentItem.category === this.state.tabState ? '' : this.loadCards() }
        <DisplayShopProducts products={this.state.cards} handleProductClick={this.handleProductClick} handleNewProductClick={this.handleNewProductClick} initialRender={true}/>

          <div className="pageColumn" style={{"height": "100%", "width": "100%","justifyContent": "center", "alignItems": "center"}}>
               <SubCategories categories={this.state.categories} handleSubCategoryClick={this.handleSubCategoryClick} handleAddNewCategory={this.handleAddNewCategory} handleCategoryRemove={this.handleCategoryRemove}/>
              {this.state.cards.length >= 1 ? <ProductEdit handleCreateProductClick={this.handleCreateProductClick} handleRemoveProductClick={this.handleRemoveProductClick} handleUpdateProductClick={this.handleUpdateProductClick} currentItem={this.state.currentItem} newProductEdit={this.state.newProductEdit} initialRender={true} /> : ''}
         </div>

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



export default connect( mapStateToProps )( CardEdit );
