import React, {Component} from 'react'
import { connect } from "react-redux";

import {removeData,getCardState,setCardState} from '../store';


class CardEdit extends Component {

  constructor(props){
    super(props)

    this.state = { tabState: "cards", cards: [], categories: [], message: "Please initialize Card Data by pressing the button on the left." }

    this.loadCards = this.loadCards.bind(this);
    this.handleCardThumbClick = this.handleCardThumbClick.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }



componentWillMount(){
  console.log('componentWillMount')
  return getCardState({name: `${this.state.tabState}`}, this.props.dispatch );
}


componentWillUpdate(){
  console.log('update')
}

handleCardThumbClick(event){
  console.log('handleCardThumbClick')
}

handleTabClick(event){

  if(typeof this.state[event.target.id] === 'undefined'){
    return this.setState({tabState: event.target.id, [`${event.target.id}`]: []});
  }else{
    return this.setState({tabState: event.target.id})
  }

}

loadCards(){

  let cardState = []

  this.props.data.forEach(e => {

    //we set card state when we see it in our data storage for the first time.

    if(e.name === this.state.tabState && this.state[this.state.tabState].length < 1){
      cardState = e.cards.map(e => e);
      return this.setState({ [`${this.state.tabState}`]: cardState, categories: e.categories})
    }

  })


if(this.state[this.state.tabState].length > 0){
  return(


      this.state[this.state.tabState].map( (e,index) => {
        return(
            <div className="cardThumbEdit" style={{"width": "90%"}}>
              <img  className="cardThumb" dataClicks={e.dataClicks} id={index} onClick={this.handleCardThumbClick} title="defaultCardState" style={{"height": "100px", "width": "100px", "padding": "5px"}} src={"./content/images/cards/"+e.path} />
              <span>{e.name}</span>
            </div>
          )
      })

  )
}else{

  if(this.state.tabState === 'cards'){
    return <button onClick={() => {setCardState({name: "defaultCardState"}, this.props.dispatch )}} style={{"borderStyle": "solid ","borderColor": "#ff637e", "backgroundColor":"#3b66e7","borderWidth": "thick", "fontFamily": "Special Elite, cursive","fontSize": "20px", "height": "100px", "width": "200px","color": "white", "cursor": "pointer"}} >Initialize Cards</button>
  }else{
    console.log('getting new card state')
    return getCardState({name: `${this.state.tabState}`}, this.props.dispatch )
  }
 }

}

render(){

  return(
    <div className="pageContainer" style={{"height": "100%", "width": "100%", "justifyContent": "center", "alignItems": "center"}}>

      <div className="pageRow" style={{"height": "100%", "width": "100%","justifyContent":"space-between"}}>
          <div className="pageColumn" style={{"fontSize": "12px", "height": "600px", "width": "30%","justifyContent":"flex-start", "alignItems": "center", "borderRight": "solid", "overflowY": "scroll"}}>
            t-shirts
          </div>

          <div className="pageColumn" style={{"height": "100%", "width": "100%","justifyContent": "center", "alignItems": "center"}}>
            <h2 style={{"fontFamily": "Roboto Slab", "fontSize": "45px"}}>T-Shirt Sub Categories</h2>
            <div className="pageRow" id="tabs" style={{"height": "100%", "width": "100%","justifyContent":"space-around", "alignItems": "center"}}>
              subCategories
            </div>
         </div>

      </div>
  </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( CardEdit );


/*


<div className="pageContainer" style={{"height": "100%", "width": "100%", "justifyContent": "center", "alignItems": "center"}}>

  <div className="pageRow" style={{"height": "100%", "width": "100%","justifyContent":"space-between"}}>
      <div className="pageColumn" style={{"fontSize": "12px", "height": "600px", "width": "30%","justifyContent":"flex-start", "alignItems": "center", "borderRight": "solid", "overflowY": "scroll"}}>
        t-shirts
      </div>

      <div className="pageColumn" style={{"height": "100%", "width": "100%","justifyContent": "center", "alignItems": "center"}}>
        <h2 style={{"fontFamily": "Roboto Slab", "fontSize": "45px"}}>T-Shirt Sub Categories</h2>
        <div className="pageRow" id="tabs" style={{"height": "100%", "width": "100%","justifyContent":"space-around", "alignItems": "center"}}>
          subCategories
        </div>
     </div>

  </div>
</div>


*/ 
