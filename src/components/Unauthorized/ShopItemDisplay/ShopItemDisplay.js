import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'


import { connect } from "react-redux";
import {removeData,addData,addCartData} from '../../../store';

import ProductImageDisplay from './ProductImageDisplay.js';
import ProductDetailsDisplay from './ProductDetailsDisplay.js';
import ProductSelectionDisplay from './ProductSelectionDisplay.js';



class ShopItemDisplay extends Component {

  constructor(props){
    super(props)

    this.state = {productObj: Object.create(null), dropDownObjects: [], checkBoxObjects: [], imgArr: []}

    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentWillUnMount(){}
componentDidMount(){

  console.log(this.state.productObj)
  console.log(this.props.data)

  let imgFileArr = [];

  const blobify = ( e, cb ) => {



    if(e['productAttributes'].photos.length > 0){


            let b64str = e['productAttributes'].photos.pop();

            let b64strSplit = b64str.split('base64,');
            let byteCharacters = atob(b64strSplit[1]);

            let byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);

                if(i === byteCharacters.length-1){
                  let byteArray = new Uint8Array(byteNumbers);

                  imgFileArr.push(new File([byteArray], `${e.name}`,{type: 'image/*'}))
                  return blobify(e, cb);
                }
            }
          }else{
            return cb();
          }

      }


if(Object.keys(this.state.productObj) < 1){

  this.props.data.forEach(e => {
    if(e.name === "cardData"){
      let cardsArr = JSON.parse(e.cards[this.props.location.state.itemCat]);

      cardsArr.forEach(product => {
        if(product.name === this.props.location.state.itemName){

          blobify(product, () => {
              this.setState({productObj: product, dropDownObjects: product.dropDownSelections.map(e => e), imgArr: imgFileArr})
          })

        }
      })
    }
   })
  }
 }

 handleSubmit(e){


   let err = false;
   let options = [];

   console.log(this.state)
   console.log(this.props)

  if(this.state.dropDownObjects[0].data.length > 0 || this.state.dropDownObjects[1].data.length > 0){ //TODO: THIS IS A TEMP HACK (WE DONT KNOW HOW MANY OPTIONS THERE ARE)
   this.state.dropDownObjects.forEach( (e,index) => {

     if(document.getElementById(`${e.name}`).value === 'default'){
      document.getElementById(`${e.name}`).className = 'dropDownSelectionError';
      err = true;
    }else{
       document.getElementById(`${e.name}`).className = 'dropDownSelection';
       options.push({name: `${e.name}`, value: document.getElementById(`${e.name}`).value});
     }

     if(this.state.dropDownObjects.length === index+1){
         if(!err){
           addCartData({name: this.state.productObj.name, category: this.state.productObj.category,price: this.state.productObj.price, id: Math.random().toString(36).substr(2), options: options.map(e=>e), qty: 1},this.props.dispatch)
           return this.props.history.push('/shoppingCart')
         }
      }

   })}else{
     addCartData({name: this.state.productObj.name, category: this.state.productObj.category,price: this.state.productObj.price, id: Math.random().toString(36).substr(2),options: options.map(e=>e),  qty: 1},this.props.dispatch)
     return this.props.history.push('/shoppingCart')
   }

 }
//id="topSection" style={{"justifyContent": "space-around"}}
render(){




  return(
    <div className="shopItemDisplayContainer" >

      <div className="shopItemDisplayPrimaryRow" >
        <ProductImageDisplay imgArr={this.state.imgArr}/>
        <ProductDetailsDisplay productObj={this.state.productObj} />
      </div>


      <div className="detailedDescription">
        <p>
          {this.state.productObj.detailedDescription}
        </p>
      </div>

        <ProductSelectionDisplay productObj={this.state.productObj} />

    <div className="addItemCenteredDiv">
      <button className="addItemButton clickable" onClick={this.handleSubmit}>Add Item To Cart</button>
    </div>
  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
    cart: state.cart,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( ShopItemDisplay );
