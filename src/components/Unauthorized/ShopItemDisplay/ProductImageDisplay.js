import React, {Component} from 'react'
import { connect } from "react-redux";

import './ProductDisplay.css';

class ProductImageDisplay extends Component {

  constructor(props){
    super(props)

    this.state = {currentImageIndex: "0"}

    this.displayPrimaryImg = this.displayPrimaryImg.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.handleScrollClick = this.handleScrollClick.bind(this)
  }


handleClick(e){


  if(document.getElementById(e.target.id).className !== 'primaryImage'){

    let currentIndex = document.getElementById('primaryImg').name;
    let newIndex = document.getElementById(e.target.id).name;

    let imgSource = document.getElementById(e.target.id).src;
    document.getElementById('primaryImg').src = imgSource;
    document.getElementById('primaryImg').name = newIndex;

    document.getElementById(`secondaryImg-${currentIndex}`).className = "secondaryImage";
    document.getElementById(e.target.id).className = "secondaryImageHighlight";


  }

}

displayPrimaryImg(){
  if(this.props.imgArr.length > 0){
  return(

      <img className="primaryImage" id="primaryImg" name="0" onClick={this.handleClick} src={URL.createObjectURL(this.props.imgArr[0])}/>
  )
  }
}

handleScrollClick(e){


  let currentIndex = parseInt(document.getElementById('primaryImg').name);
//  let newIndex = document.getElementById(e.target.id).name;

  if(e.target.id === "ScrollBack"){
    if(currentIndex-1 >= 0){

      let imgSource = document.getElementById(`secondaryImg-${currentIndex-1}`).src;
      document.getElementById('primaryImg').src = imgSource;
      document.getElementById('primaryImg').name = (currentIndex-1).toString();
      document.getElementById(`secondaryImg-${currentIndex}`).className = "secondaryImage";
      document.getElementById(`secondaryImg-${currentIndex-1}`).className = "secondaryImageHighlight";
    }

  }else{//scroll forward
    if(currentIndex+1 <= this.props.imgArr.length-1){

      let imgSource = document.getElementById(`secondaryImg-${currentIndex+1}`).src;
      document.getElementById('primaryImg').src = imgSource;
      document.getElementById('primaryImg').name = (currentIndex+1).toString();
      document.getElementById(`secondaryImg-${currentIndex}`).className = "secondaryImage";
      document.getElementById(`secondaryImg-${currentIndex+1}`).className = "secondaryImageHighlight";
    }

  }

}

render(){

/*productDisplay
  Assumes we have at least one img File this.props.imgArr
*/
  return(
    <div className="mainDiv" >


      <div className="topRow">
        <div className="imgScroll" id="ScrollBack" onClick={this.handleScrollClick}>
           <img  id="ScrollBack" src="./content/images/arrow_left-24px.svg" />
            </div>
              {this.displayPrimaryImg()}
            <div className="imgScroll"  id="ScrollForward" onClick={this.handleScrollClick}>
           <img  id="ScrollBack" src="./content/images/arrow_right-24px.svg" />
        </div>
      </div>

      <div className="bottomRow">
      {this.props.imgArr.map( (e,index) => {

       if(index > 0){
          return(

             <img className="secondaryImage" id={`secondaryImg-${index}`} name={`${index}`} onClick={this.handleClick} src={URL.createObjectURL(this.props.imgArr[index])} />

          )
        }else{
          return(

             <img className="secondaryImageHighlight" id={`secondaryImg-${index}`} name={`${index}`} onClick={this.handleClick} src={URL.createObjectURL(this.props.imgArr[index])} />

          )
        }

      })}
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



export default connect( mapStateToProps )( ProductImageDisplay );
