import React, {Component} from 'react'
import { connect } from "react-redux";



import './ShoppingCart.css';

class PaymentInput extends Component {

  constructor(props){
    super(props)

    this.state = {billingAddressSame: true}

    this.handleBillingAddressClick = this.handleBillingAddressClick.bind(this);
  }

/*****************************************************/
/****************** Class  Methods  ******************/
/*****************************************************/


handleBillingAddressClick(e){

  this.state.billingAddressSame ? this.setState({billingAddressSame: false}) : this.setState({billingAddressSame: true})
}


render(){

  return(
    <div className="paymentInputContainer" >

    <div className="paymentInputColumn" id="contactInputBox">
      <h4 style={{"margin": "1%"}}>Contact Information</h4>
      <input className="paymentInputBox" type="text" id="emailPaymentInput" placeholder="Email Address"/>
      <input className="paymentInputBox" type="text" id="phonePaymentInput" maxLength="15" placeholder="Phone Number (numbers only)"/>
    </div>


    <div className="paymentInputColumn" id="shippingInputBox">
    <h4 style={{"margin": "1%"}}>Name And Shipping Information</h4>
      <input className="paymentInputBox" type="text" id="nameShippingInput" maxLength="100" placeholder="Full Name"/>
      <input className="paymentInputBox" type="text" id="address1ShippingInput" maxLength="100" placeholder="Address Line 1 (Street Adddress, P.O Box, County Name)"/>
      <input className="paymentInputBox" type="text" id="address2ShippingInput" maxLength="100" placeholder="Address Line 2 Apt #, Suite #, Building, Floor"/>
      <input className="paymentInputBox" type="text" id="cityShippingInput" maxLength="100" placeholder="City"/>
      <input className="paymentInputBox" type="text" id="stateShippingInput" maxLength="100" placeholder="State"/>
      <input className="paymentInputBox" type="text" id="zipShippingInput" maxLength="100" placeholder="Zip Code"/>
      <input className="paymentInputBox" type="text" id="countryShippingInput" maxLength="100" placeholder="Country"/>
    </div>

    <div className="paymentInputColumn" id="paymentInputBox">


      <span style={{"margin": "1%"}}>Billing Address Same as Shipping?
      <input className="paymentInputBox" type="checkbox" id="billingAddressCheckbox" defaultChecked={true} checked={this.state.handleBillingAddressClick} onClick={this.handleBillingAddressClick} />
      </span>
    </div>

    <div className="paymentInputColumn" id="billingInputBox" hidden={this.state.billingAddressSame}>
    <h4 style={{"margin": "1%"}}>Billing Address Information</h4>
      <input className="paymentInputBox" type="text" id="nameBillingInput" placeholder="Full Name"/>
      <input className="paymentInputBox" type="text" id="address1BillingInput" placeholder="Address Line 1 (Street Adddress, P.O Box, County Name)"/>
      <input className="paymentInputBox" type="text" id="address2BillingInput" placeholder="Address Line 2 Apt #, Suite #, Building, Floor"/>
      <input className="paymentInputBox" type="text" id="cityBillingInput" placeholder="City"/>
      <input className="paymentInputBox" type="text" id="stateBillingInput" placeholder="State"/>
      <input className="paymentInputBox" type="text" id="zipBillingInput" placeholder="Zip Code"/>
      <input className="paymentInputBox" type="text" id="countryBillingInput" placeholder="Country"/>
    </div>



   </div>

  )
 }
}

/*
<h4 style={{"margin": "1%"}}>Credit or Debit Card</h4>
  <input className="paymentInputBox" type="text" id="namePaymentInput" maxLength="100" placeholder="Card Holder Name"/>
  <input className="paymentInputBox" type="text" id="cardPaymentInput" maxLength="19" placeholder="Card #"/>
  <input className="paymentInputBox" type="number" id="monthPaymentInput" min="1" step="1" placeholder="Expiration Month (ex: 12)" />
  <input className="paymentInputBox" type="number" id="yearPaymentInput" min="2019" step="1" placeholder="Expiration Year (ex: 2022)" />
  <input className="paymentInputBox" type="text" id="cvvPaymentInput" maxLength="4" placeholder="CVV" />
  */
  

const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( PaymentInput );
