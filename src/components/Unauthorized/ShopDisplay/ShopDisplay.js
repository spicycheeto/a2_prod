import React, {Component} from 'react'
import { connect } from "react-redux";
import {removeData,getCardState,getAllCardState, updateCardState} from '../../../store';
import ProductDisplay from './ProductDisplay';
import Categories from './Categories';

import './ShopDisplay.css';

class ShopDisplay extends Component {

  constructor(props){
    super(props)

    this.state = { tabState: null, cards: [], categories: ['default'] }

    this.loadCards = this.loadCards.bind(this);
    this.handleCardThumbClick = this.handleCardThumbClick.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);

    this.handleScroll = this.handleScroll.bind(this);
  }



  componentWillMount(){
  //  getCardState({name: `${this.state.tabState}`}, this.props.dispatch );
    return getAllCardState(this.props.dispatch);
  }



  handleCardThumbClick(event){
  // return updateCardState({cards: this.state.tabState, cardState: this.state.cards[event.target.id] },this.props.dispatch )
  }

  handleTabClick(event){

  console.log('handleTabCick')

  this.props.data.forEach(e => {

    if(e.name === 'cardData'){

    return this.setState({tabState: event})
    }
  })
 }

  loadCards(){

  let cardState = []
  let categories = []
  this.props.data.forEach(e => {



if(e.name === "cardData" && this.state.tabState === null){
      categories = Object.keys(e.cards);
      if(categories.length > 0){
        return this.setState( {tabState: categories[0], cards: cardState, categories: categories } )
     }
    }
  })


}



getCardState(){
  let cardState = []
  if(this.state.tabState !== null){

      this.props.data.forEach(e => {
        if(e.name === 'cardData'){

          if(this.state.tabState === 'All'){
            for(let key in e.cards){
              cardState.push({tour: key, tourData: JSON.parse(e.cards[key])})
            }
            //cardState = JSON.parse(e.cards);
          }else{
            cardState = [{tour: this.state.tabState, tourData: JSON.parse(e.cards[this.state.tabState])}];
          }


        }
      })

      return cardState;
  }else{
    return cardState;
  }
}

componentDidMount(){
//window.addEventListener('scroll', this.handleScroll)
this.shopDisplayPage.addEventListener('wheel', this.handleScroll)
}

handleScroll(event) {

  //lock categories menu to top of page when user scrolls down
  //NOT DONE

    let headerHeight = document.getElementById('header').getBoundingClientRect().height

    if(document.getElementById('categories').getBoundingClientRect().y <= headerHeight){

      document.getElementById('searchRow').className = 'catFixedPageRow'
      document.getElementById('searchRow').style.top = headerHeight +"px";

    }else if(document.getElementById('productDisplayColumn').getBoundingClientRect().top - document.getElementById('searchRow').getBoundingClientRect().bottom < 10 ){
        console.log('goback!')
        if(document.getElementById('searchRow').className !== 'categoriesPageRow'){
              document.getElementById('searchRow').className = 'categoriesPageRow'
        }
      }



  }


render(){


  return(

    <div >

    <div className="shopDisplayPageContainer" ref={elem => this.shopDisplayPage = elem} >
    <Categories  handleTabClick={this.handleTabClick} categoryState={ this.state.categories } />
    <ProductDisplay cardState={this.getCardState()} handleCardThumbClick={this.handleCardThumbClick}/>
    {this.loadCards()}
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



export default connect( mapStateToProps )( ShopDisplay );
