

module.exports = function (app,redisapi){

  app.post('/adminpanel/removependingorder', (req,res,next)=> {


    if(req.isLoggedIn){
      //req.body.transactionNumber is the order we are removing.
      //pendingOrder.transactionNumber
      redisapi.getPendingTransactionArr( (err,result) => {

        if(err){
          return res.end(JSON.stringify( { name: 'message', message: err } ) )
        }else{
          let pendingTransactionArr = JSON.parse(result);
          let newPendingTransactionArr = pendingTransactionArr.filter(e => {
            if(e.transactionNumber !== req.body.transactionNumber){
              return e;
            }
          })

          redisapi.createPendingTransactionArr(JSON.stringify(newPendingTransactionArr), (err,result) => {
            return res.end(JSON.stringify( { name: 'message', message: `Transaction Number ${req.body.transactionNumber} is now completed.` } ) )
          })
        }

      })
    }

  })


}
