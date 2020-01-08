import React, {Component} from 'react'
import { connect } from "react-redux";


import './ProductEdit.css';

class Photos extends Component {

  constructor(props){
    super(props)

    this.state = {}

    this.handleFileSelection = this.handleFileSelection.bind(this)
    this.displayImages = this.displayImages.bind(this)
    this.handlePhotoRemove = this.handlePhotoRemove.bind(this)




  }

componentWillUpdate(){}

handleFileSelection(e){

  console.log("handleFileSelection photos")
    let newFileArr = [];//this.props.photoFiles.map(e => e);
    let primaryPhoto  = "";
    //primaryPhoto = document.getElementsByClassName("primaryImgThumbNail").item(0).id;

    for(let i=0; i < e.target.files.length; i++){
        newFileArr.push( e.target.files.item(i) )
      }

  return this.props.handlePhotoFilesUpdate( newFileArr );

}

handleImgClick(e){
  console.log('imgclick')
  document.getElementById(document.getElementsByClassName("primaryImgThumbNail").item(0).id).className = "imgThumbNail";
  document.getElementById(e.target.id).className = "primaryImgThumbNail";
}



handlePhotoRemove(event){
  console.log("*****")
  console.log(this.props.photoFiles)
  console.log(event.target.id)
  return this.props.handlePhotoFilesRemove( this.props.photoFiles.filter(e => e.name !== event.target.id) );
}

displayImages(blobArr){


if(blobArr.length === 0){

  return (
    <div className="columnCenter" >
      <img className="imgThumbNail" id='defaultImg' onClick={this.handleImgClick} src="./content/moxy.png"/>
      <p><h6>Add a photo to remove this default image</h6></p>
    </div>
  )

}else{
  return blobArr.map( (e,index) => {
    if(index === 0){
      return (
        <div className="columnCenter" >
          <img className="primaryImgThumbNail" id={`img:`+index} onClick={this.handleImgClick} src={URL.createObjectURL(e)} />
          <a href="#" className="removeCategoryButton" id={`${this.props.currentItem.name}-img-${index}`} onClick={this.handlePhotoRemove} >remove</a>
        </div>
      )
    }else{
      return (
        <div className="columnCenter" >
          <img className="imgThumbNail" id={`img:`+index} onClick={this.handleImgClick} src={URL.createObjectURL(e)} />
          <a href="#" className="removeCategoryButton" id={`${this.props.currentItem.name}-img-${index}`} onClick={this.handlePhotoRemove} >remove</a>
        </div>
      )
    }
  })
  }
}



render(){
  console.log("photos render")
  console.log(this.props.photoFiles)


  return(
    <div className="columnCenter">
      <div className="rowCentered">
        {this.displayImages(this.props.photoFiles)}
      </div>

      <div className="rowCentered">
        <input className="editProductButton" type="file" id="photoFileInput" accept="image/*" multiple onChange={this.handleFileSelection} />
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



export default connect( mapStateToProps )( Photos );
