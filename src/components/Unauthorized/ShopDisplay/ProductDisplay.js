import React, {Component} from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import './ShopDisplay.css';

class ProductDisplay extends Component {

  constructor(props){
    super(props)

    this.state = {imgRows: []}

  }


  displayProducts(cardState){

    let count = 0;
    let tmpArr = [];

    const blobify = ( e, cb ) => {

      if(e['productAttributes'].photos.length > 0){
        
              let b64str = e['productAttributes'].photos[0];

              let b64strSplit = b64str.split('base64,');
              let byteCharacters = atob(b64strSplit[1]);
            //  console.log(b64strSplit)
              let byteNumbers = new Array(byteCharacters.length);
              for (var i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);

                  if(i === byteCharacters.length-1){
                    let byteArray = new Uint8Array(byteNumbers);
                    return cb(new File([byteArray], `${e.name}`,{type: 'image/*'}))
                  }
              }


          }

    }

    return(
      cardState.map( (e,index) => {//1

    return blobify(e, (file) => {

        if(cardState.length === index+1){//we are at the last element in cardState, we need to build the last row with less than 4 elements.
          tmpArr.push(



          <div className="productCard">
          <Link to={{pathname: "/ShopItem", state: {itemName: e.name, itemCat:e.category, itemIndex: index}}} >
          <div className="productName">{e.name}</div>
          <img  className="productCardImage" src={URL.createObjectURL(file)} />

          <div  className="priceInnerDiv" dataClicks={e.dataClicks} >


          <div className="productDescription">

            <p>Take a one day tour in the city with local guide that knows all the best spots!</p>
            <h3>$200 / 2 persons </h3>
          </div>


            <div className="viewDeals" id={index} onClick={this.props.handleCardThumbClick}>
              View Deals >>
            </div>

          </div>
          </Link>

        </div>
          )

          if(cardState.length <= 3){
            return (
              <div>
                <div className="productTitle">
                  <h1>{e.category}</h1>
                  <hr />
                </div>

                <div className="productDisplayLastRow">
                  {tmpArr.map(e => e)}
                </div>
            </div>
            )
          }else{
            return(
              <div className="productDisplayLastRow">
                {tmpArr.map(e => e)}
              </div>
            )
          }

        }else if(count >= 2){//adjust this number to change amount of products in each row.
        count = 0;
        tmpArr.push(



        <div className="productCard">

        <Link to={{pathname: "/ShopItem", state: {itemName: e.name, itemCat:e.category, itemIndex: index}}} >
        <div className="productName">{e.name}</div>
        <img  className="productCardImage" src={URL.createObjectURL(file)} />

        <div  className="priceInnerDiv" dataClicks={e.dataClicks} >
        <div className="productDescription">


        <p>Take a one day tour in the city with local guide that knows all the best spots!</p>
        <h3>$200 / 2 persons </h3>
        </div>

          <div className="viewDeals" id={index} onClick={this.props.handleCardThumbClick}>
            View Deals >>
          </div>

        </div>
          </Link>
      </div>

        )
        let rowArr = tmpArr.map(e => e)
        tmpArr = []; //empty temp array before next iteration.
        return(
          <div>
            <div className="productTitle">
              <h1>{e.category}</h1>
              <hr />
            </div>

              <div className="productDisplayRow">
                {rowArr.map( e => e)}
              </div>
            </div>
        )
      }else if(count === 0 && cardState > 1){//3
          tmpArr = [];
          count++;

          tmpArr.push(

            <div className="productCard">
            <Link to={{pathname: "/ShopItem", state: {itemName: e.name, itemCat:e.category, itemIndex: index}}} >
            <div className="productName">{e.name}</div>
            <img  className="productCardImage" src={URL.createObjectURL(file)} />

            <div  className="priceInnerDiv" dataClicks={e.dataClicks} >

              <div className="productDescription">


                <p>Take a one day tour in the city with local guide that knows all the best spots!</p>
                <h3>$200 / 2 persons </h3>
              </div>


              <div className="viewDeals" id={index} onClick={this.props.handleCardThumbClick}>
                View Deals >>
              </div>

            </div>
              </Link>

          </div>

         )
       }else{//4

            count++;
            tmpArr.push(
              <div className="productCard">
              <Link to={{pathname: "/ShopItem", state: {itemName: e.name, itemCat:e.category, itemIndex: index}}} >
                <div className="productName">{e.name}</div>
                <img  className="productCardImage" src={URL.createObjectURL(file)} />

                <div  className="priceInnerDiv" dataClicks={e.dataClicks} >

                  <div className="productDescription">


                  <p>Take a one day tour in the city with local guide that knows all the best spots!</p>
                  <h3>$200 / 2 persons </h3>
                  </div>


                  <div className="viewDeals" id={index} onClick={this.props.handleCardThumbClick}>
                    View Deals >>
                  </div>

                </div>
                </Link>

              </div>
          )

        }

       })
     })

    )
  }


displayAllProducts(){
  console.log('displayAllProducts')
  console.log(this.props.cardState)
}
render(){





  this.props.cardState.forEach( (e,index) => {

    console.log(e[`tourData`].length)
  })

/*  {this.props.carState.map( (e,index) => {

    return(
      this.displayProducts(e[`tourData`])
    )

  })}
  */
  return(

   <div className="productDisplayColumn" id="productDisplayColumn" >
   {
     this.props.cardState.map( (e,index) => {
       return(

         this.displayProducts(e[`tourData`])

       )
     })
   }
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



export default connect( mapStateToProps )( ProductDisplay );
