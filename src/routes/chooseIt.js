let fs = require('fs');
import path from "path";

module.exports = function (app,redisApi){


app.post( "/chooseIt/getCardState", ( req, res, next ) => {


    let imageFiles = fs.readdirSync('./dist/content/images/logos');
    let cards = []
    imageFiles.forEach(e => {
      cards.push({path: e, dataClicks: "0"})
    })
    res.end(JSON.stringify( { name: 'defaultCardState', cards: cards } ) )


  })


}
