let fs = require('fs');
import path from "path";

var atob = require('atob');
var blob = require('blob');


module.exports = function (app,redisApi){


app.post( "/cardDisplay/getCardState", ( req, res, next ) => {


        redisApi.getCardData(req.body.name, (err,result) => {

          if(result){

            redisApi.getCardCategories( (err,cardCategories) => {

              if(!err) res.end(JSON.stringify( { name: req.body.name, cards: JSON.parse(result), categories: JSON.parse(cardCategories) } ) )
            })

          }else{
            res.end(JSON.stringify( { name: 'failure', message: "Unable to serve request." } ) )
          }
        })
  })

  app.post("/cardDisplay/addNewCategory", (req, res, next) => {

    if(req.isLoggedIn){
      let newCategoryArr = [{name: "default product", dataClicks: "0", category: req.body['newCategoryName'], details: ["Included Feature","Included Feature","Included Feature","Included Feature"],  productAttributes: {description: 'This is the default product for this category. Remove this item once you have created your first product', photos: [],sizes: [], colors: [] }  }];
      if(req.body['newCategoryName'].length <= 32){
        redisApi.setCardData(req.body['newCategoryName'], JSON.stringify(newCategoryArr), (err,result) => {
          res.end(JSON.stringify( { name: 'message', message: "Category Saved." } ) )
        })
      }else{
        res.end(JSON.stringify( { name: 'message', message: "Length of Category name should be less than or equal to 32" } ) )
      }

    }else{//user not logged in
      res.end(JSON.stringify( { name: 'message', message: "Category Saved." } ) )
    }
  })


  app.post("/cardDisplay/removeCategory", (req, res, next) => {

    if(req.isLoggedIn){


        //Array.isArray( JSON.parse(allCardData[req.body.categoryName] ) )

          redisApi.delCardData(req.body.categoryName, (err,result) => {
            console.log("RREMOVE CATEGORY RESULT:")
            console.log(result)
            if(result){
            redisApi.getAllCardData( (err,allCardData) => {

              if(allCardData){
              res.end(JSON.stringify( {name: "cardData", cards: allCardData, categories: Object.keys(allCardData) } ) )
            //  res.end(JSON.stringify( { name: 'message', message: "Category removed." } ) )
              }else{
                  res.end(JSON.stringify( { name: 'message', message: "Category removed." } ) )
              }
            })

          }else{
            res.end(JSON.stringify( { name: 'message', message: "Category not removed." } ) )
          }


          })




    }else{//user not logged in
      res.end(JSON.stringify( { name: 'message', message: "log in." } ) )
    }

  } )

  app.post( "/cardDisplay/createProduct", ( req, res, next ) => {

    try{

    if(req.isLoggedIn){

      redisApi.getAllCardData( (err,allCardData) => {

        if(Array.isArray(JSON.parse(allCardData[ req.body['category' ] ]) ) ) {//does this category exist?

          /******** Customer specific product items ************/
          let newProduct = {
            name: '',
            dataClicks: "0",
            category: '',
            dropDownSelections: [],
            description: "",
            details: [],
            briefDescription: "",
            detailedDescription: "",
            price: 0.00,
            productAttributes: {

              photos: [],
              sizes: [],
              colors: [],
             }
            }
            let name = req.body.name;
            let dropDownSelections = req.body.dropDownSelections;


            let sizes =  req.body.productAttributes['sizes'];
            let colors =  req.body.productAttributes['colors'];
            let photos =  req.body.productAttributes['photos'];
            let price = req.body.price;



            newProduct.detailedDescription = req.body.detailedDescription;
            newProduct.briefDescription = req.body.briefDescription;
            newProduct.details = req.body.details.map(e=>e);

            newProduct.price = parseFloat(price);

            newProduct.category = req.body.category;

            if(Array.isArray(dropDownSelections) && dropDownSelections.length > 0 ){
              dropDownSelections.forEach(e => {
                newProduct.dropDownSelections.push({name: e.name, data: e.data.map(e=>e)})
              })
            }

            if(typeof description === 'string'){
              newProduct.productAttributes['description'] = description;
              newProduct.description = description;
            }

            if(typeof name === 'string'){
              newProduct.name = name;
            }

            /*
            if(Array.isArray(details) && details.length === 4){
              newProduct.productAttributes['details'] = details.map(e => {if(typeof e === 'string'){return e}else{return 'default'}})
              newProduct.details = details.map(e => {if(typeof e === 'string'){return e}else{return 'default'}})
            }
            */
            /*
            if(Array.isArray(sizes) && details.length <= 4){
              newProduct.productAttributes['sizes'] = sizes.map(e => {if(typeof e === 'string'){return e}else{return 'default'}})

            }*/

            if(Array.isArray(colors) && colors.length <= 3){
              newProduct.productAttributes['colors'] = colors.map(e => {if(typeof e === 'string'){return e}else{return 'default'}})
            }

            if(Array.isArray(photos) && photos.length <= 4){
              newProduct.productAttributes['photos'] = photos.map(e => {if(typeof e === 'string'){return e}else{return 'default'}})
            }

            /***************************************************/

            let categoryArr = JSON.parse(allCardData[ req.body['category' ] ] )
            categoryArr.push(newProduct)
            redisApi.setCardData(req.body['category' ], JSON.stringify(categoryArr), (err,result) => {
              return res.end(JSON.stringify( { name: 'message', message: `${req.body.name} added to the ${req.body['category' ]} category` } ) )
            })

          }else{//category doesn't exist yet; user needs to follow create category process
            return res.end(JSON.stringify( { name: 'message', message: "Product NOT created! Try again." } ) )
          }
        })

    }else{//user not logged in
      return res.end(JSON.stringify( { name: 'message', message: "Product NOT Updated! Try again." } ) )
    }
  }catch(error){
    console.log(error) //try catch error
  }
  })

  app.post( "/cardDisplay/removeProduct", ( req, res, next ) => {

    if(req.isLoggedIn){

      redisApi.getAllCardData( (err,allCardData) => {

        if(JSON.parse( allCardData[ req.body['category' ] ] ).some(e => e.name === req.body.name) ){


        let newCardCategoriesArr = JSON.parse( allCardData[req.body['category'] ] ).filter(e => e.name !== req.body['name'])

        if(newCardCategoriesArr.length !== 0){
          redisApi.setCardData(req.body['category'], JSON.stringify(newCardCategoriesArr), (err,result) => {
              return res.end(JSON.stringify( { name: 'message', message: "Product Has Been removed." } ) )
          })
        }else{//there are no products in this category. We push a default item to be displayed on client side.
          newCardCategoriesArr.push({name: "default product", dataClicks: "0", category: req.body['category'], productAttributes: {details: ["Product Feature","Product Feature","Product Feature","Product Feature"], description: 'This is the default product for this category. Remove this item once you have created your first product', photos: [],sizes: [], colors: [] }  })
          redisApi.setCardData(req.body['category'], JSON.stringify(newCardCategoriesArr), (err,result) => {
              return res.end(JSON.stringify( { name: 'message', message: "Product Has Been removed." } ) )
          })
        }

      }else{//no matching category in our allCardData (bad user input)
        return res.end(JSON.stringify( { name: 'message', message: "Product NOT Updated! Try again." } ) )
      }
    })
  }else{//user not logged in
    return res.end(JSON.stringify( { name: 'message', message: "Product Has Been Updated" } ) )
  }
 })



  app.post( "/cardDisplay/updateProduct", ( req, res, next ) => {
    try{
    if(req.isLoggedIn){
      redisApi.getAllCardData( (err,allCardData) => {

        let newCardDataObject = {};
        if(JSON.parse(allCardData[req.body.category]).some(e => e.name === req.body.name) ) {//check if the product already exists or not.

          let product = JSON.parse(allCardData[req.body.category]).filter(e => e.name === req.body.name);

          if(product.length <= 1){

            let updatedProduct = product[0];

            let sizes =  req.body.productAttributes['sizes'];
            let colors =  req.body.productAttributes['colors'];
            let photos =  req.body.productAttributes['photos'];
            let dropDownSelections = req.body.dropDownSelections;

            updatedProduct.details = req.body.details.map(e =>e); //check needs to be here

            updatedProduct.name = req.body.name;
            updatedProduct.category = req.body.category;
            updatedProduct.detailedDescription = req.body.detailedDescription;
            updatedProduct.briefDescription = req.body.briefDescription;
            updatedProduct.price = parseFloat(req.body.price);
            updatedProduct.details = req.body.details.map(e => e);

            dataURItoBlob(photos[0], (blob) => {
              console.log(typeof blob)
            })


            let tempDropDowns = [];
            if(Array.isArray(dropDownSelections) && dropDownSelections.length > 0 ){
              dropDownSelections.forEach(e => {
                tempDropDowns.push({name: e.name, data: e.data.map(e=>e)})
              })
              updatedProduct.dropDownSelections = tempDropDowns.map(e => e);
            }

            /*updatedProduct.productAttributes['description'] = req.body.productAttributes['description'];
            if(Array.isArray(details) && details.length === 4){
              updatedProduct.productAttributes['details'] = details.map(e => {if(typeof e === 'string'){return e}else{return 'default'}})
            }*/

            /*
            if(Array.isArray(sizes) && details.length <= 4){
              updatedProduct.productAttributes['sizes'] = sizes.map(e => {if(typeof e === 'string'){return e}else{return 'default'}})
            }*/

            if(Array.isArray(colors) && colors.length <= 3){
              updatedProduct.productAttributes['colors'] = colors.map(e => {if(typeof e === 'string'){return e}else{return 'default'}})
            }

            if(Array.isArray(photos) && photos.length <= 4){
              updatedProduct.productAttributes['photos'] = photos.map(e => {if(typeof e === 'string'){return e}else{return 'default'}})
            }

            let newCategoryArr = [];
            JSON.parse(allCardData[req.body.category]).forEach( (e,index) => {

              e.name === updatedProduct.name ? newCategoryArr.push(updatedProduct) : newCategoryArr.push(e)

              if(JSON.parse(allCardData[req.body.category]).length === index+1){
                console.log(newCategoryArr)
                redisApi.setCardData(req.body.category, JSON.stringify(newCategoryArr), (err,result) => {
                  return res.end(JSON.stringify( { name: 'message', message: "Product Has Been Updated" } ) )
                })
              }
            })
          }else{
            res.end(JSON.stringify( { name: 'message', message: "Duplicate items detected in the same category." } ) )
          }
      }else{
      res.end(JSON.stringify( { name: 'message', message: "Unable to find product. Try creating a new one." } ) )
      }
     })
    }else{ //user not logged in.

      res.end(JSON.stringify( { name: 'message', message: "Product Has Been Updated" } ) )
    }
  }catch(error){
    console.log(error)
  }
  })



    app.get( "/cardDisplay/getAllCardData", ( req, res, next ) => {
            redisApi.getAllCardData( (err,result) => {
              console.log('***********')
              if(result){console.log(Object.keys(result).length)}else{console.log(0)}
              if(result){
                redisApi.getCardCategories( (err,cardCategories) => {
                  if(!err) {
                    res.end(JSON.stringify( {name: "cardData", cards: result, categories: JSON.parse(cardCategories) } ) )
                  }
                })
              }else{
              //  res.end(JSON.stringify( {name: "cardData", cards: {default: []}, categories: [] } ) )
                res.end(JSON.stringify( {error: "Empty Categories"} ) )
          }
        })
      })

  //updates the click counter on a card.
  app.post( "/cardDisplay/updateCardState", ( req, res, next ) => {

          redisApi.getCardData(req.body.cards, (err,result) => {

            if(result && typeof req.body.cardState.name === "string" && typeof req.body.cards === "string"){

              let cards = JSON.parse(result);
              let newCardData = [];

              cards.map( (e,index) => {

                if(cards.length === index+1){
                  e.name === req.body.cardState.name ? e.dataClicks++ : ''
                  newCardData.push(e);
                  redisApi.setCardData(req.body.cards, JSON.stringify(newCardData), (err,result) => {
                    return next();
                  })

                }else{
                  e.name === req.body.cardState.name ? e.dataClicks++ : ''
                  newCardData.push(e);
                }
              })
            }else{
              return next();
            }
          })

    })


  app.post( "/cardDisplay/setCardState", ( req, res, next ) => {


    if(req.isLoggedIn){

      createCardData( './dist/content/images/cards', (err,categories,cards) => {


        redisApi.setCardCategories(JSON.stringify(categories) , (err,result) => {


          categories.forEach(e => {

            let newCardsArr = cards.filter(cardObj => {
              if(cardObj.category === e){
                return cardObj;
              }
            })

            redisApi.setCardData(e, JSON.stringify(newCardsArr), (err,result) => {
              if(!err){  res.end(JSON.stringify( { name: 'response', message: 'success' } ) )
              }else{
                  res.end(JSON.stringify( { name: 'response', message: 'failure' } ) )
              }
            })

          })

        })
      })
    }else{
      next();
    }
})

const scanCardImageDirectory = (callback) => {

  const rootCardDirectory = './dist/content/images/logos';

  let imageFiles = fs.readdirSync('./dist/content/images/logos');
  let cards = [];
  let categories = [];

  imageFiles.forEach(e => {
    cards.push({name: e.split(".")[0] ,path: e, dataClicks: "0", category: __dirname.split(path.sep).pop() , description: "Add a description for this card."})
    categories.some(e => e === __dirname.split(path.sep).pop() ) ? '' : categories.push(__dirname.split(path.sep).pop())
  })

    return callback(cards,categories);
  }

}




const createCardData = (dirpath,cb) => {

  let cards = [];
  let categories = [];

  let dirfiles = fs.readdirSync(dirpath)

  let filterSubFolder = function(subFiles,dirpath, callback){

      let subFilesArr = [];
      subFiles.forEach( (sFile,index) => {
        fs.readdir(dirpath + path.sep + sFile, (err,result) => {
          if(!result) subFilesArr.push(sFile);
          if(subFiles.length === index+1){
            callback(null,subFilesArr)
          }
        })
      })
  }

  dirfiles.forEach( (e,index) => {

    fs.readdir(dirpath + path.sep + e, (err,files) => {
      if(files){

        let subfiles = fs.readdirSync(dirpath + path.sep + e);

        filterSubFolder(subfiles,dirpath + path.sep + e, (err,subFilesArr) => {

          categories.some(category => {if(category!==e){return categories.push(e) } });
          subFilesArr.forEach( (sFile,sIndex) => {
            cards.push( {
              name: sFile.split(".")[0],
              path: sFile,
              dataClicks: "0",
              category: e ,
              productAttributes: {
                details: ["detail1","detail2","detail3","detail4"],
                description: 'product description',
                photos: [],
                sizes: [],
                colors: [] }})

            if(dirfiles.length === index+1 && subFilesArr.length === sIndex+1){
              return cb(null,categories,cards)
            }
          })
        })

      }else{
        let nPath = (dirpath + path.sep + e).split(path.sep)
        categories.some(e => e === nPath[nPath.length - 2] ) ? '' : categories.push(nPath[nPath.length - 2])
        cards.push({
          name: e.split(".")[0],
          path: e,
          dataClicks: "0",
          category: nPath[nPath.length - 2],
          productAttributes: {
            details: ["detail1","detail2","detail3","detail4"],
            description: 'product description',
            photoPaths: [],
            sizes: [],
            colors: [] }})

        if(dirfiles.length === index+1){
          return cb(null,categories,cards)
        }
      }
    })
  })
}



const dataURItoBlob = (dataURI, callback) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
  console.log(blob);
    //return bb
//    bb.append(ab);
    //return bb.getBlob(mimeString);
}
