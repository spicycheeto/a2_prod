import React, {Component} from 'react'
import { connect } from "react-redux";
import {editCartItem, removeCartItemData,purchaseProduct,removeData} from '../../../store';

import PaymentInput from './PaymentInput.js';
import './ShoppingCart.css';

var dropin = require('braintree-web-drop-in');


let totalCost = 0;


class ShoppingCart extends Component {

  constructor(props){
    super(props)

    this.state = {

      dropinInstance: {},
  //    totalCost: null,


    }


    this.myRef = React.createRef()


    this.handleRemove = this.handleRemove.bind(this)
    this.handlePurchase = this.handlePurchase.bind(this)
    this.displayMessage = this.displayMessage.bind(this)
    this.quantityChange = this.quantityChange.bind(this)




  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/


handlePurchase(){
console.log(document.getElementById('billingAddressCheckbox').checked)
let purchaseObject = Object.create(null);
let err = false;

///^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById(`emailPaymentInput`).value) ){
  document.getElementById(`emailPaymentInput`).className = 'paymentInputBox';
  purchaseObject.email = document.getElementById(`emailPaymentInput`).value;
  }else{
    err = true;
    document.getElementById(`emailPaymentInput`).className = 'paymentInputBoxError';
  }


  if(/^\d+$/.test(document.getElementById(`phonePaymentInput`).value) ){
    document.getElementById(`phonePaymentInput`).className = 'paymentInputBox';
    purchaseObject.phone = document.getElementById(`phonePaymentInput`).value;
    }else{
      err = true;
      document.getElementById(`phonePaymentInput`).className = 'paymentInputBoxError';
    }


  if(document.getElementById('nameShippingInput').value.length >= 4){
    document.getElementById(`nameShippingInput`).className = 'paymentInputBox';
    purchaseObject.shippingName = document.getElementById('nameShippingInput').value;
  }else{
    err = true;
    document.getElementById(`nameShippingInput`).className = 'paymentInputBoxError';
  }

  if(document.getElementById('address1ShippingInput').value.length > 0 || document.getElementById('address2ShippingInput').value.length > 0){
    document.getElementById(`address1ShippingInput`).className = 'paymentInputBox';
    document.getElementById(`address2ShippingInput`).className = 'paymentInputBox';
    purchaseObject.shippingAddress1 = document.getElementById('address1ShippingInput').value;
    purchaseObject.shippingAddress2 = document.getElementById('address2ShippingInput').value;
  }else{
    err = true;
    document.getElementById(`address2ShippingInput`).className = 'paymentInputBoxError'
    document.getElementById(`address1ShippingInput`).className = 'paymentInputBoxError';
  }

  if(document.getElementById('cityShippingInput').value.length > 0){
    document.getElementById(`cityShippingInput`).className = 'paymentInputBox';
    purchaseObject.shippingCity = document.getElementById('cityShippingInput').value;
  }else{
    err = true;
    document.getElementById(`cityShippingInput`).className = 'paymentInputBoxError';
  }

  if(document.getElementById('stateShippingInput').value.length > 0){
    document.getElementById(`stateShippingInput`).className = 'paymentInputBox';
  purchaseObject.shippingState = document.getElementById('stateShippingInput').value;
  }else{
    err = true;
    document.getElementById(`stateShippingInput`).className = 'paymentInputBoxError';
  }


  if(document.getElementById('zipShippingInput').value.length > 0){
    document.getElementById(`zipShippingInput`).className = 'paymentInputBox';
    purchaseObject.shippingZip = document.getElementById('zipShippingInput').value
  }else{
    err = true;
    document.getElementById(`zipShippingInput`).className = 'paymentInputBoxError';
  }


  if(document.getElementById('countryShippingInput').value.length > 0){
    document.getElementById(`countryShippingInput`).className = 'paymentInputBox';
    purchaseObject.shippingCountry = document.getElementById('countryShippingInput').value;
  }else{
    err = true;
    document.getElementById(`countryShippingInput`).className = 'paymentInputBoxError';
  }

/*
  if(document.getElementById('namePaymentInput').value.length > 0){
    document.getElementById(`namePaymentInput`).className = 'paymentInputBox';
    purchaseObject.paymentName = document.getElementById('namePaymentInput').value;
  }else{
    err = true;
    document.getElementById(`namePaymentInput`).className = 'paymentInputBoxError';
  }

  if(document.getElementById('cardPaymentInput').value.length >= 15 && /^\d+$/.test(document.getElementById(`monthPaymentInput`).value) ){
    document.getElementById(`cardPaymentInput`).className = 'paymentInputBox';
    purchaseObject.paymentCard = document.getElementById('cardPaymentInput').value;
  }else{
    err = true;
    document.getElementById(`cardPaymentInput`).className = 'paymentInputBoxError';
  }



  if(/^\d+$/.test(document.getElementById(`monthPaymentInput`).value) ){
    document.getElementById(`monthPaymentInput`).className = 'paymentInputBox';
    purchaseObject.paymentMonth = document.getElementById('monthPaymentInput').value;
    }else{
      err = true;
      document.getElementById(`monthPaymentInput`).className = 'paymentInputBoxError';
    }

    if(/^\d+$/.test(document.getElementById(`yearPaymentInput`).value) ){
      document.getElementById(`yearPaymentInput`).className = 'paymentInputBox';
      purchaseObject.paymentYear = document.getElementById('yearPaymentInput').value;

      }else{
        err = true;
        document.getElementById(`yearPaymentInput`).className = 'paymentInputBoxError';
      }


  if(document.getElementById('cvvPaymentInput').value.length <= 4  && /^\d+$/.test(document.getElementById(`cvvPaymentInput`).value) ) {
    document.getElementById(`cvvPaymentInput`).className = 'paymentInputBox';
    purchaseObject.paymentCvv = document.getElementById('cvvPaymentInput').value;
  }else{
    err = true;
    document.getElementById(`cvvPaymentInput`).className = 'paymentInputBoxError';
  }
*/

/**********************************************************************/
  if(!document.getElementById('billingAddressCheckbox').checked){

    purchaseObject.billingAddress = true;

    if(document.getElementById('nameBillingInput').value.length > 4){
      document.getElementById(`nameBillingInput`).className = 'paymentInputBox';
      purchaseObject.billingName = document.getElementById('nameBillingInput').value;
    }else{
      err = true;
      document.getElementById(`nameBillingInput`).className = 'paymentInputBoxError';
    }

    console.log(document.getElementById('address1BillingInput').value.length)
    console.log(document.getElementById('address2BillingInput').value.length)

    if(document.getElementById('address1BillingInput').value.length > 0 || document.getElementById('address2BillingInput').value.length > 0){
      document.getElementById(`address1BillingInput`).className = 'paymentInputBox';
      document.getElementById(`address2BillingInput`).className = 'paymentInputBox';
      purchaseObject.billingAddress1 = document.getElementById('address1BillingInput').value;
      purchaseObject.billingAddress2 = document.getElementById('address2BillingInput').value;

    }else{
      err = true;
      document.getElementById(`address1BillingInput`).className = 'paymentInputBoxError';
      document.getElementById(`address2BillingInput`).className = 'paymentInputBoxError';

    }

    if(document.getElementById('cityBillingInput').value.length > 0){
      document.getElementById(`cityBillingInput`).className = 'paymentInputBox';
      purchaseObject.billingCity = document.getElementById('cityBillingInput').value;

    }else{
      err = true;
      document.getElementById(`cityBillingInput`).className = 'paymentInputBoxError';
    }

    if(document.getElementById('stateBillingInput').value.length > 0){
      document.getElementById(`stateBillingInput`).className = 'paymentInputBox';
      purchaseObject.billingState = document.getElementById('stateBillingInput').value;

    }else{
      err = true;
      document.getElementById(`stateBillingInput`).className = 'paymentInputBoxError';
    }


    if(document.getElementById('zipBillingInput').value.length > 0){
      document.getElementById(`zipBillingInput`).className = 'paymentInputBox';
      purchaseObject.billingZip = document.getElementById('zipBillingInput').value;

    }else{
      err = true;
      document.getElementById(`zipBillingInput`).className = 'paymentInputBoxError';
    }


    if(document.getElementById('countryBillingInput').value.length > 0){
      document.getElementById(`countryBillingInput`).className = 'paymentInputBox';
      purchaseObject.billingCountry = document.getElementById('countryBillingInput').value;

    }else{
      err = true;
      document.getElementById(`countryBillingInput`).className = 'paymentInputBoxError';
    }

  }else{ purchaseObject.billingAddress = false; }

/*************************************************************************/



this.props.cart.forEach(e => {

  //TODO:
  //EACH PRODUCT NEEDS A UNIQUE IDENTIFIER
  // EXAMPLE: e.id-qty  instead of e.name-qty.
  console.log(document.getElementById(`${e.id}-qty`).value);

})

purchaseObject.cart = [];
this.props.cart.forEach(e => {
  e.qty = document.getElementById(`${e.id}-qty`).value;
  purchaseObject.cart.push(e);
})

purchaseObject.total = document.getElementById(`totalCost`).value;

 if(!err){

  this.state.dropinInstance.requestPaymentMethod((requestPaymentMethodErr, payload) =>{

    if(!requestPaymentMethodErr){
      console.log(`Making purchase`)
      console.log(purchaseObject)
      purchaseObject.nonce = payload.nonce;
      return purchaseProduct(purchaseObject, this.props.dispatch);
    }else{
      console.log(requestPaymentMethodErr)
    }
 });

}

}



handleRemove(e){


  this.props.cart.forEach( (cartItem,index) => {
      if(cartItem.id === `${e.target.id}`){
          return removeCartItemData(cartItem, this.props.dispatch);
      }
    })
}

displayMessage(){
  return(
    this.props.data.map(e => {
      if(e.name === "message"){
        return(
          <div className="messageRow" >
          <h4>{e.message}</h4>
          </div>
        )
      }
    })
  )
}


componentWillMount(){

  /*dropin.create({
         authorization: 'sandbox_ykxhytkd_c4ms4ytqsydkb23c',
         container: 'dropin-container',

       },  function(createErr, instance){
         console.log('****')
         console.log(instance)
         //this.setState({dropinInstance: instance})
       })*/
}

componentDidMount(){

  return dropin.create({
         authorization: 'sandbox_ykxhytkd_c4ms4ytqsydkb23c',
         container: '#dropin-container',

       }, (err,instance) => {
         if(!err){
         return this.setState({dropinInstance: instance})
          }else{
         console.log(err)
        }
       })

  //return removeData("message", this.props.data)
}

componentWillUpdate(){}
componentDidUpdate(){}

quantityChange(e){

this.props.cart.forEach( (cartItem,index) => {
    if(`${cartItem.id}-qty` === `${e.target.id}`){
        cartItem.qty = document.getElementById(`${e.target.id}`).value
        return editCartItem(cartItem, this.props.dispatch);
    }
  })

}

render(){


console.log(this.props)
console.log(this.state)

totalCost = 0;
//console.log(document.getElementById(`totalCost`).value)
//style={{"marginTop": "200px", "height": "100%", "width": "100%"}}
  return(
    <div className="shoppingCartContainer">

    <div className="shoppingCartTable">
    {this.displayMessage()}
    <h1>Shopping Cart Items:</h1>
    <table>
      <tr>
        <th>Product</th>
        <th>Description</th>
        <th>Unit Price</th>
        <th>Quantity</th>
        <th>Total Cost</th>
      </tr>
      {

        this.props.cart.map( (e,index) => {
          //if(totalCost === 0){
            totalCost += parseFloat(e.price) * e.qty;
          //}
          console.log(e)
          return (
            <tr>
              <td >{e.name}</td>
              <td>{e.options.map( (option,index) => {

                if(e.options.length === index + 1){
                  return ` ${option.name}: ${option.value} `;
                }else{
                  return ` ${option.name}: ${option.value}, `;
                }

              })}
              </td>
              <td><input id={`${e.name}-unitPrice`} value={e.price} readonly /></td>
              <td><input name={e.name} id={`${e.id}-qty`} onChange={this.quantityChange} type="number" min="1" step="1" value={`${e.qty}`} /></td>
              <td><input id={`${e.name}-price`} value={e.price*e.qty} readonly/></td>
              <td><a name={e.name} id={e.id} onClick={this.handleRemove}>Remove</a></td>
            </tr>
          )
        })
      }
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th><input id="totalCost" value={totalCost} readonly /> </th>

      </tr>
    </table>

      <PaymentInput />
      <div id="dropin-container"></div>
       <button className="purchaseButton" id="submit-button" onClick={this.handlePurchase}>Confirm Purchase</button>



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



export default connect( mapStateToProps )( ShoppingCart );


/*
       {() => {
        return( dropin.create({
               authorization: 'sandbox_ykxhytkd_c4ms4ytqsydkb23c',
               container: 'dropin-container',
               paypal: {
                 flow: 'vault'
               }
             }, function (createErr, instance) {
               document.querySelector('submit-button').addEventListener('click', function () {
                 instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                   // Submit payload.nonce to your server
                   console.log(instance)
                });
               });
             }));

       }
     }*/
