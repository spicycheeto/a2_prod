



export class PurchaseValidator {


  validator(paymentInput, callback){

    let paymentObj = Object.create(null);
    let inputMessages = [];
    let badClientInput = false;



    //badClientInputors in any of the checks below throws callback(null,{ name: 'message', message: "related badClientInputor message" })

    /*
    * Do we have a string that looks like an email?
    */
    try{
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(paymentInput.email) ){

      paymentObj.email = paymentInput.email;

      }else{
        badClientInput = true;
        inputMessages.push('Invalid Email.');
      }


      /*
      *Do we have an integer that looks like a phone number?
      */

      if(/^\d+$/.test(paymentInput.phone) && (paymentInput.email.length >= 10 && paymentInput.email.length < 16) ) {
        paymentObj.phone = paymentInput.phone
        }else{
          badClientInput = true;
          inputMessages.push('Invalid Phone number.');
        }

      /*
      * Do we have all required information for shipping?
      */

      if(paymentInput.shippingName.length >= 4){
        paymentObj.shippingName = paymentInput.shippingName;
      }else{
        badClientInput = true;
        inputMessages.push('Name for shipping address.');
      }


      /*
      * valid shipping address?
      */
      if(paymentInput.shippingAddress1.length > 0 || paymentInput.shippingAddress2.length > 0){
        paymentObj.shippingAddress1 = paymentInput.shippingAddress1;
        paymentObj.shippingAddress2 = paymentInput.shippingAddress2;
      }else{
        badClientInput = true;
        inputMessages.push('Missing Shipping Address.');
      }

      if( paymentInput.shippingCity.length > 0 ){
        paymentObj.shippingCity = paymentInput.shippingCity;
      }else{
        badClientInput = true;
        inputMessages.push('Missing Shipping City.');
      }



      if( paymentInput.shippingState.length > 0 ){
        paymentObj.shippingState = paymentInput.shippingState;
      }else{
        badClientInput = true;
        inputMessages.push('Missing Shipping City.');
      }


      if( paymentInput.shippingZip.length > 0 ){
        paymentObj.shippingZip = paymentInput.shippingZip;
      }else{
        badClientInput = true;
        inputMessages.push('Missing Shipping City.');
      }

      if( paymentInput.shippingCountry.length > 0 ){
        paymentObj.shippingCountry = paymentInput.shippingCountry;
      }else{
        badClientInput = true;
        inputMessages.push('Missing Shipping Country.');
      }

      /*
      if( paymentInput.paymentName.length > 0 ){
        paymentObj.paymentName = paymentInput.paymentName;
      }else{
        badClientInput = true;
        inputMessages.push('Missing Shipping City.');
      }

      if( (paymentInput.paymentCard.length >= 15 && paymentInput.paymentCard.length < 20 ) && /^\d+$/.test(paymentInput.paymentCard) ){
        paymentObj.paymentCard = paymentInput.paymentCard;
      }else{
        badClientInput = true;
        inputMessages.push('Incorrect card #.');
      }

      if( (paymentInput.paymentMonth > 0 && paymentInput.paymentMonth < 13) && /^\d+$/.test(paymentInput.paymentMonth) ){
        paymentObj.paymentMonth = paymentInput.paymentMonth;
      }else{
        badClientInput = true;
        inputMessages.push('Incorrect Card Expiration Month.');
      }

      if( (paymentInput.paymentYear > 2018 && paymentInput.paymentMonth < 3000) && /^\d+$/.test(paymentInput.paymentMonth) ){
        paymentObj.paymentYear = paymentInput.paymentYear;
      }else{
        badClientInput = true;
        inputMessages.push('Incorrect Card Expiration Month.');
      }

      if( (paymentInput.paymentCvv > 99 && paymentInput.paymentCvv < 10000) &&  /^\d+$/.test(paymentInput.paymentCvv) ){
        paymentObj.paymentCvv = paymentInput.paymentCvv;
      }else{
        badClientInput = true;
        inputMessages.push('Incorrect CVV #.');
      }

      */

      /********
      ******** Billing address diffferent from shipping address
      *******/
      if(paymentInput.billingAddress){

        if(paymentInput.billingName.length >= 4){
          paymentObj.billingName = paymentInput.billingName;
        }else{
          badClientInput = true;
          inputMessages.push('Name for billing address.');
        }


        /*
        * valid shipping address?
        */
        if(paymentInput.billingAddress1.length > 0 || paymentInput.billingAddress2.length > 0){
          paymentObj.billingAddress1 = paymentInput.shippingAddress1;
          paymentObj.billingAddress2 = paymentInput.billingAddress2;
        }else{
          badClientInput = true;
          inputMessages.push('Missing Billing Address.');
        }

        if( paymentInput.billingCity.length > 0 ){
          paymentObj.billingCity = paymentInput.billingCity;
        }else{
          badClientInput = true;
          inputMessages.push('Missing Billing City.');
        }



        if( paymentInput.billingState.length > 0 ){
          paymentObj.billingState = paymentInput.billingState;
        }else{
          badClientInput = true;
          inputMessages.push('Missing Billing City.');
        }


        if( paymentInput.billingZip.length > 0 ){
          paymentObj.billingZip = paymentInput.billingZip;
        }else{
          badClientInput = true;
          inputMessages.push('Missing Billing Zip.');
        }

        if( paymentInput.billingCountry.length > 0 ){
          paymentObj.billingCountry = paymentInput.billingCountry;
        }else{
          badClientInput = true;
          inputMessages.push('Missing Billing Country.');
        }

      }


    }catch(err){

      badClientInput = true;
      return callback(null,{ name: 'badClientInputor_message', message: "badClientInput" })
    }

    if(!badClientInput){
        paymentObj.nonce = paymentInput.nonce;
      return callback(paymentObj,null);
    }else{
        return callback(null,{ name: 'badClientInputor_message', message: inputMessages.toString() })
    }
  }



}
