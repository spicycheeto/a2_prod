

export class RedisApi {

        constructor(client){

          this.client = client;
        }

        getCardData(cardField, cb){

          this.client.hget('cardData',cardField, function(err,result){
            err ? cb(err,null) : cb(null, result);
          })
        }

        getAllCardData(cb){
          this.client.hgetall('cardData', function(err,result){
            err ? cb(err,null) : cb(null, result);
          })
        }

        setCardData(cardField,value, cb){
          this.client.hset('cardData',cardField,value, function(err,result){
            err ? cb(err,null) : cb(null, result);
          })
        }

        delCardData(cardKey, cb){
          this.client.hdel('cardData',cardKey, function(err,result){
            err ? cb(err,null) : cb(null, result);
          })
        }


        setCardCategories(categoriesArr, cb){
          this.client.set('cardCategories',categoriesArr, function(err,result){
            err ? cb(err,null) : cb(null, result);
          })
        }

        getCardCategories( cb ){
          this.client.get('cardCategories', function(err,result){
            err ? cb(err,null) : cb(null, result);
          })
        }

        createPendingTransactionArr(pendingTransactionArr, cb){
          this.client.set('pendingTransactionArr',pendingTransactionArr, function(err,result){
            err ? cb(err,null) : cb(null, result);
          })
        }

        getPendingTransactionArr( cb ){
          this.client.get('pendingTransactionArr', function(err,result){
            err ? cb(err,null) : cb(null, result);
          })
        }

  getEmailFromApiKey(apiKey, cb){
    this.client.hget('apikeys',apiKey, function(err,result){
    err ? cb(err,null) : cb(null, result);
  })
}


  setNewApiKey(apiKey,email){
    this.client.hmset('apikeys',apiKey,email)
   }

  deleteApiKey(apiKey){
    this.client.hdel('apikeys',apiKey)
  }



  setUnconfirmedTransactions(tx, cb){

    this.client.send_command('set',[`unconfirmedTx`, tx], function(err,result){
        err ? cb(err,null) : cb(null,result)
    })
  }

  getUnconfirmedTransactions(cb){

   this.client.get('unconfirmedTx', function(err,result){
     err ? cb(err,null) : cb(null, result);
   })
}

  setOrderIDs(orderIDArr, cb){

    this.client.send_command('set',[`orderIDs`, orderIDArr], function(err,result){
        err ? cb(err,null) : cb(null,result)
    })
  }


  getOrderIDs(cb){

   this.client.get('orderIDs', function(err,result){
     err ? cb(err,null) : cb(null, result);
   })
  }

   setConfirmedTransactions(txObj, cb){

     this.client.hset('confirmedTxs', txObj, function(err,result){
         err ? cb(err,null) : cb(null,result)
     })
   }

   getConfirmedTransactions(cb){

    this.client.hgetall('confirmedTxs', function(err,result){
      err ? cb(err,null) : cb(null, result);
    })
 }


    /* Map session ID to users Email address
    */
    setUserEmail(sessionID, email,ttl, cb) {

      this.client.send_command('set',[`user:${sessionID}`, email,'EX',ttl], function(err,result){
          err ? cb(err,null) : cb(null,result)
      })


    }

    /* Get Users email from session ID.
    */
    getUserEmail(sessionID, cb) {

      this.client.get(`user:${sessionID}`, function(err,result){
        err ? cb(err,null) : cb(null,result)
      });
    }

    /**
     * Check if user exists in the db.
     *
     * @param {String} sid
     * @api public
     */

     findOne(sid, cb){
       this.client.send_command('hexists',['Users-Hash', sid],function(err,result){
         result > 0 ?  cb(null,true) :  cb(null,false)
       })
     }

     findEmailFromUsername(username,cb){
       this.client.hget('Username-Hash',username, function(err,result){

         return cb(null,result);
       })
     }


  //   this.client.hmset("Username-Hash",username, email, function(err,result){})

    /**
     * Create a new user on the redis server.
     *
     * @param {String} sid
     * @param {String} password
     * @api public
     */
        createUser(email,username, password, cb){


          let destinationTag = Math.floor((Math.random() * 10000) + 100000);
          let activationNumber = Math.floor((Math.random() * 80000) + 10000);

          let destinationTags = [];

/*
          this.client.hgetall("destTags", function(err,result){

            console.log(typeof result)
            console.log(result)
            destinationTags = Object.entries(result).map(e => e)

          })
*/

        //  while(true){

          //  if(destinationTags.some(e => parseInt(e) === destinationTag)){
          //    destinationTag = Math.floor((Math.random() * 10000) + 100000);

          if(false){


            }else{

              let userItems = {
                name: 'userData',
                username: username,
                email: email,
                activationNumber: 1,
                activationLimit: 0,
                authorizationLevel: '0',
                twofa: 0,
                apiKey: 'none',
                sessionHistory: '0',
                ipHistory: '0',
                lastLogin: '0',
                firstLogin: '0',
                forgotPasswordKey: null,
                forgotPasswordLimit: 0,
                destinationTag: destinationTag,

                verificationStatus: true,
                balances: [ {currency: 'xrp', currencyName:'Ripple', balance: 0}, {currency: 'usd', currencyName: 'U.S. Dollar', balance: 0} ],
                escrow: [],
                txHistory: []

              }

              this.client.hmset("destTags",destinationTag, email, function(err,result){
                console.log(`destTag result: ${result}`)
              })

             this.client.hmset("Users-Hash",email, password, function(err,result){
                console.log(`Users-Hash result: ${result}`)
              })

             this.client.hmset("Username-Hash",username, email, function(err,result){
                console.log(`Username-Hash result: ${result}`)
              })

             this.client.hset("User-Data",email,JSON.stringify(userItems),function(err,result){
                    err ? cb(err,null) : cb(null,result)
              });

              
            }
          //}
        }


        /**
         * set the action item tracker
         * @param {String} community name
         * @param {String} action title of action being considered
         * @param {String} ttl #number of seconds this action will be considered
         * @api public
        */
        setTwofaSessionKey(sessionID,twofakey,cb){

          this.client.set(sessionID,twofakey,'EX',100, function(err,result){
            err ? cb(err,null) : cb(null,result)
          });
        }

        getTwofaSessionKey(sessionID,cb){
          this.client.send_command('get',[sessionID],function(err,result){
            err ? cb(err,null) : cb(null,result)
          })
        }


/************************************************/
//
// USER-DATA FUNCTIONS
//
/*********************************************/

        /**
         * retrieve user data
         * @param {String} email users email address
         * @param {function} callback
         * @api public
         */

        getUserData(userEmail,cb){

          this.client.hget(`User-Data`,userEmail, function(err,values){
            err ? cb(err,null) : cb(null,values)
          })
        }

        /**
         * set user data
         * @param {String} email users email address
         * @param {String} field field in user-data hash we are editing: community,activation,username,email,authorization. some of these fields should NOT be edited.
         * @param {String} value value for the field we are editiing.
         * @param {function} callback
         * @api public
         */

        setUserData(userEmail,data,cb){


          this.client.hset('User-Data',userEmail,JSON.stringify(data), function(err,result){
            err ? cb(err,null) : cb(null,result)
          })
        }



     /**
      * Get user password hash
      *
      * @param {String} sid
      * @api public
      */

     getUserPassword(sid,cb){
       this.client.hget('Users-Hash', sid, (err,value) => {
         return cb(null,value);
       })
     }

     /**
      * change user password
      *
      * @param {String} sid
      * @api public
      */
     changeUserPassword(email,password,cb){

       this.client.send_command('hset',['Users-Hash', email, password],function(err,result){
         return cb(null,result);
       })
     }



     /**
      * retrieves session ttl
      *
      * @param {String} sid
      * @api public
      */
      remainingTTL(sid){}

      /**
       * Update community master ledger
       * @param {String} community name
       * @api public
      */
      masterLedgerUpdate(){}



      /**
       * Destroy the session associated with the given `sid`.
       *
       * @param {String} sid
       * @api public
       */

      destroy(sid, cb) {
        debug('DEL "%s"', sid);
        if (Array.isArray(sid)) {
          var multi = this.client.multi();
          var prefix = this.prefix;
          sid.forEach(function (s) {
            multi.del(prefix + s);
          });
          multi.exec(fn);
        } else {
          sid = this.prefix + sid;
          this.client.del(sid, fn);
        }
      }




      /**
       * Commit the given `sess` object associated with the given `sid`.
       *
       * @param {String} sid
       * @param {Session} sess
       * @param {Function} fn
       * @api public
       */

      set (sid, sess, fn) {
        var store = this;
        var args = [store.prefix + sid];
        if (!fn) fn = noop;

        try {
          var jsess = store.serializer.stringify(sess);
        }
        catch (er) {
          return fn(er);
        }

        args.push(jsess);

        if (!store.disableTTL) {
          var ttl = getTTL(store, sess, sid);
          args.push('EX', ttl);
          debug('SET "%s" %s ttl:%s', sid, jsess, ttl);
        } else {
          debug('SET "%s" %s', sid, jsess);
        }

        store.client.set(args, function (er) {
          if (er) return fn(er);
          debug('SET complete');
          fn.apply(null, arguments);
        });
      };



}
