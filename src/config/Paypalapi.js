
var braintree = require("braintree");


var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'c4ms4ytqsydkb23c',
    publicKey:    'p22zp75ssd3xnfbq',
    privateKey:   '3687b6e443fa2aa13b84bbf7b49f37a2'
});

export class PayPalApi {



confirmPurchase(clientInput,totalCost, callback){

  console.log('Validating purchase with braintree')

      gateway.transaction.sale({
      amount: totalCost,
      paymentMethodNonce: clientInput.nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      if(!err){

        if(result.success){
          return callback(null,result.transaction.id);
          }else{
            console.log('braintree processing payment fail')
            return callback(null,false);
          }
      }else{
        return callback(err,null)
      }
    });


}


}
