
import {PurchaseValidator} from '../config/PurchaseValidator';
import {PayPalApi} from '../config/Paypalapi';


let paymentInputValidtator = new PurchaseValidator();
let paypal = new PayPalApi();


module.exports = function (app,redisapi){

app.post('/cart/confirmpurchase', (req,res,next)=> {
  console.log('req.body::')
  console.log(req.body)

  paymentInputValidtator.validator(req.body, (validInput,err) => {


    if(validInput){

      //TODO: validate cart item price against price stored in db. If each price matches we then calculate the total price (price for each item X quantity).
      //after cart items are validated and we have calculated the total price we create a validCart object. Combining validInput and validCart we build a Pending Order Object.
      //Required fields of the pending Order object are sent to the paypal api or some other merchant api to produce a confirmed purchase. Following the confirmed purchase we
      //store the pending order to the database minus any credit card information and send emails receipts to administrator and customer.


      try{
      let invalidCart = Object.create(null);
      invalidCart = req.body.cart.map(e => e);
      let validatedCart = [];
      let validTotal = 0;

      redisapi.getAllCardData( (err,result) => {
        let allProducts = Object.keys(result)


        allProducts.forEach( (category,productIndex) => {
          let catArr = JSON.parse(result[`${category}`]);

           catArr.forEach( (product,catArrIndex) => {


               invalidCart.forEach( (cartItem,invalidCartIndex) => {


                 if(product.name === cartItem.name && product.category === cartItem.category){

                   console.log(`cartItem`)
                   console.log(cartItem)
                  let productPrice = parseFloat(product.price);
                  let cartItemPrice = parseFloat(cartItem.price);
                  let cartItemQty = parseInt(cartItem.qty);
                   //verify item price is correct or end processing
                  if(productPrice * cartItemQty === cartItemPrice * cartItemQty){

                   let validItem = {name: product.name, category: product.category, price: product.price, quantity: cartItemQty, options: []}


                   try{
                   cartItem.options.forEach( (option,index) => {

                     if(product.productAttributes[`${option.name}`]){

                        product.productAttributes[`${option.name}`].forEach(e => {
                          if(e === option.value){
                            validItem.options.push(option)
                          }
                        })

                     }else{
                         return res.end(JSON.stringify( { name: 'message', message: 'error 1' } ) )
                     }

                     if(cartItem.options.length === index+1){
                       //verify total is correct or end processing
                       validTotal += productPrice * cartItemQty;
                       validatedCart.push(validItem);
                     }
                   })
                 }catch(err){
                   console.log('Process Payment Error!, cart.js, Line 88')
                   console.log(err)
                   return res.end(JSON.stringify( { name: 'message', message: 'error x' } ) )
                 }

                 }else{//cartItem price was different from the price we have in db.
                    return res.end(JSON.stringify( { name: 'message', message: 'error bubu bowl' } ) )
                 }

                   //compare price of item in database with item in the invalidatedCart
                   //compare the options in the invalidCart with the options in the db product. Each option should exist in our db product.
                   //if the prices match AND each option is a valid option, we put the item from the invalidCart into the valid cart.


                 }
                 if( (allProducts.length === productIndex+1 && catArr.length === catArrIndex + 1) && invalidCart.length === invalidCartIndex+1 ){


                   //send valid input to paypal api

                  paypal.confirmPurchase(validInput,validTotal, (err,purchaseConfirmed) => {






                     if(purchaseConfirmed){
                       //if paypal purchase is successful store purchase in pending orders database along with transaction number.
                         let pendingOrder = Object.create(null);
                         pendingOrder.email = validInput.email;
                         pendingOrder.phone = validInput.phone;

                           pendingOrder.shippingName = validInput.shippingName;
                           pendingOrder.shippingAddress1 = validInput.shippingAddress1;
                           pendingOrder.shippingAddress2 = validInput.shippingAddress2;
                           pendingOrder.shippingZip = validInput.shippingZip;
                           pendingOrder.shippingCountry = validInput.shippingCountry;
                           pendingOrder.items = invalidCart;
                           pendingOrder.transactionId = purchaseConfirmed;
                           pendingOrder.totalCost = validTotal;

                           pendingOrder.cart = []

                           validatedCart.forEach(e => {
                             pendingOrder.cart.push({item: e, options: e.options})
                           })


                           console.log('final order');
                           console.log(JSON.stringify(pendingOrder));

                           redisapi.getPendingTransactionArr( (err,result) => {


                             if(err){//error occurred while pulling from the db

                               return res.end(JSON.stringify( { name: 'message', message: err } ) )

                             }else{

                               if(result){//we pulled the pendingTransactionArr and pending transactions already exist so we add to it and store an  updated version.
                                 let pendingTransactionArr = JSON.parse(result);
                                 pendingOrder.transactionNumber = pendingTransactionArr.length + 1;
                                 pendingTransactionArr.push(pendingOrder);
                                 redisapi.createPendingTransactionArr(JSON.stringify(pendingTransactionArr), (err,result) => {
                                   return res.end(JSON.stringify( { name: 'message', message: "Product Has Been Purchased" } ) )
                                 })

                               }else{
                                 //PendingTransactionArr doesn't exist yet.
                                 pendingOrder.transactionNumber = 1;
                                 let pendingTransactionArr = [pendingOrder];
                                 redisapi.createPendingTransactionArr(JSON.stringify(pendingTransactionArr), (err,result) => {
                                   return res.end(JSON.stringify( { name: 'message', message: "Product Has Been Purchased" } ) )
                                 })

                               }
                             }

                           })


                       //else return error message to the client.
                           //send receipt to customer and to administrator.
                           //return successful purchase message to the client.

                     }

                     else{
                       //the transaction was rejected by paypal.
                       return res.end(JSON.stringify( { name: 'message', message: err, debug:'antibiotic fubar'} ) )
                     }

                   })




                 }



               })



           })



        })

      })

    }catch(err){
      console.log('db error::')
      console.log(err)
      return res.end(JSON.stringify( { name: 'message', message: 'err01'} ) )
    }







    }else{

      //We received bad input, return error message to the client.
      return res.end(JSON.stringify( err ) ) //{ name: 'message', message: err.message, debug:'0' } ) )
    }

  })
  console.log('wtf')
})





}
