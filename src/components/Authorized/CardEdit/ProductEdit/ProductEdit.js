import React, {Component} from 'react'
import { connect } from "react-redux";

import {updateCurrentItemPhotos} from '../../../../store.js';

//Product Attributes:
import Colors from './Colors.js';
import Details from './Details.js';
import Photos from './Photos.js';
import Sizes from './Sizes.js';

import Price from './Price.js'
import DetailedDescription from './DetailedDescription.js';
import BriefDescription from './BriefDescription.js';

class ProductEdit extends Component {

  constructor(props){
    super(props)

    this.state = {
        photoFiles: [],
        category: '',
        name: '',
        path: '',
        description: '',
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        photoPaths: [],
        sizes: [],
        colors: [],

    }

    this.displayButtons = this.displayButtons.bind(this)
    this.handleAddNewProduct = this.handleAddNewProduct.bind(this)
    this.handleUpdateProduct = this.handleUpdateProduct.bind(this)
    this.handlePhotoFilesUpdate = this.handlePhotoFilesUpdate.bind(this)
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
    this.blobifyBase64Images = this.blobifyBase64Images.bind(this)
    this.initiateState = this.initiateState.bind(this)
    this.handlePhotoFilesRemove = this.handlePhotoFilesRemove.bind(this)
  }


componentWillMount(){
  console.log('productEdit MOUNTING')
  this.initiateState();
}
componentWillUpdate(){
  console.log('productEdit WILL Update')
}

componentDidUpdate(){
  console.log('productEdit did update')
  this.initiateState();

}

initiateState(){
  if(this.props.newProductEdit && this.props.initialRender){

    this.props.initialRender = false;
    this.setState( { photoFiles: [] } )

  }else if(!this.props.newProductEdit && this.props.initialRender){

    this.props.initialRender = false;
    this.blobifyBase64Images( (fileArr) => {
      console.log('setting photofile state **')
      this.setState( { photoFiles: fileArr } )

    });
  }
}

blobifyBase64Images(cb){
    let blobArr = [];


    if(this.props.currentItem['productAttributes'].photos.length > 0){

      this.props.currentItem['productAttributes'].photos.forEach( (e,index) => {

        if(typeof e === 'string'){
        let splitStr = e.split('base64,')
        let byteCharacters = atob(splitStr[1]);

        let byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        var file = new File([byteArray], `${this.props.currentItem.name}-img-${index}`,{type: 'image/svg+xml'});

        blobArr.push(file);

      }else if(e instanceof File){

        blobArr.push(e)
      }

     })
   }

   return cb(blobArr.map(e => e))
}

handleUpdateProduct(event){

  if(event.target.id === "updateProduct"){
    let sizeArr = [];
    document.getElementById('size-S').className === "editSizeButtonPushed" ? sizeArr.push('S') : '';
    document.getElementById('size-M').className === "editSizeButtonPushed" ? sizeArr.push('M') : '';
    document.getElementById('size-L').className === "editSizeButtonPushed" ? sizeArr.push('L') : '';
    document.getElementById('size-XXL').className === "editSizeButtonPushed" ? sizeArr.push('XXL') : '';

    let colorArr = [];
    document.getElementById('color-red').className === "colorButtonPushed" ? colorArr.push('red') : '';
    document.getElementById('color-blue').className === "colorButtonPushed" ? colorArr.push('blue') : '';
    document.getElementById('color-black').className === "colorButtonPushed" ? colorArr.push('black') : '';

    let photoData = [];

    let reader = new FileReader();

    reader.onload = (e) => {
      if(reader.readyState === 2){
        photoData.push(reader.result);
        if(this.state.photoFiles.length > 0){
          reader.readAsDataURL(this.state.photoFiles.pop())
        }else{
          return (this.props.handleUpdateProductClick({
            name: this.props.currentItem.name,
            path: this.props.currentItem.path,
            dataClicks: this.props.currentItem.dataClicks,
            category: this.props.currentItem.category,
            dropDownSelections: [{name: "colors", data: colorArr.map(e => e)}, {name: "sizes", data: sizeArr.map(e => e)}],
            price: document.getElementById('productPrice').value,
            briefDescription: document.getElementById('briefDescription').value,
            detailedDescription: document.getElementById('detailedDescription').value,
            details: [document.getElementById('productAttribute-0').value,document.getElementById('productAttribute-1').value,document.getElementById('productAttribute-2').value,document.getElementById('productAttribute-3').value],
            productAttributes: {
              
              details: [],

              sizes: sizeArr,
              colors: colorArr,
              photos: photoData,
            }
          }));
        }
      }
    }


    if(this.state.photoFiles.length > 0){
      console.log(this.state.photoFiles)
      reader.readAsDataURL(this.state.photoFiles.pop())
    }else{
      return (this.props.handleUpdateProductClick({
        name: this.props.currentItem.name,
        path: this.props.currentItem.path,
        dataClicks: this.props.currentItem.dataClicks,
        category: this.props.currentItem.category,
        dropDownSelections: [{name: "colors", data: colorArr.map(e => e)}, {name: "sizes", data: sizeArr.map(e => e)}],
        price: document.getElementById('productPrice').value,
        briefDescription: document.getElementById('briefDescription').value,
        detailedDescription: document.getElementById('detailedDescription').value,
        details: [document.getElementById('productAttribute-0').value,document.getElementById('productAttribute-1').value,document.getElementById('productAttribute-2').value,document.getElementById('productAttribute-3').value],
        productAttributes: {

          details: [],

          sizes: sizeArr,
          colors: colorArr,
          photos: photoData,
        }
      }));
    }
  }
}

handleAddNewProduct(){
  let sizeArr = [];
  document.getElementById('size-S').className === "editSizeButtonPushed" ? sizeArr.push('S') : '';
  document.getElementById('size-M').className === "editSizeButtonPushed" ? sizeArr.push('M') : '';
  document.getElementById('size-L').className === "editSizeButtonPushed" ? sizeArr.push('L') : '';
  document.getElementById('size-XXL').className === "editSizeButtonPushed" ? sizeArr.push('XXL') : '';

  let colorArr = [];
  document.getElementById('color-red').className === "colorButtonPushed" ? colorArr.push('red') : '';
  document.getElementById('color-blue').className === "colorButtonPushed" ? colorArr.push('blue') : '';
  document.getElementById('color-black').className === "colorButtonPushed" ? colorArr.push('black') : '';

  let photoData = [];
  let reader = new FileReader();



  reader.onload = (e) => {
    if(reader.readyState === 2){
      photoData.push(reader.result);
      if(this.state.photoFiles.length > 0){
        reader.readAsDataURL(this.state.photoFiles.pop())
      }else{
        return (this.props.handleCreateProductClick({
          name: document.getElementById('newProductName').value,
          dataClicks: this.props.currentItem.dataClicks,
          category: this.props.currentItem.category,
          dropDownSelections: [{name: "colors", data: colorArr.map(e => e)}, {name: "sizes", data: sizeArr.map(e => e)}],
          price: document.getElementById('productPrice').value,
          briefDescription: document.getElementById('briefDescription').value,
          detailedDescription: document.getElementById('detailedDescription').value,
          details: [document.getElementById('productAttribute-0').value,document.getElementById('productAttribute-1').value,document.getElementById('productAttribute-2').value,document.getElementById('productAttribute-3').value],
          productAttributes: {

            details: [],

            sizes: sizeArr,
            colors: colorArr,
            photos: photoData,

          }
        }));
      }
    }
  }

  alert(this.state.photoFiles)
  if(this.state.photoFiles.length > 0){
    reader.readAsDataURL(this.state.photoFiles.pop())
  }else{
    return (this.props.handleCreateProductClick({
      name: document.getElementById('newProductName').value,
      dataClicks: this.props.currentItem.dataClicks,
      category: this.props.currentItem.category,
      dropDownSelections: [{name: "colors", data: colorArr.map(e => e)}, {name: "sizes", data: sizeArr.map(e => e)}],
      price: document.getElementById('productPrice').value,
      briefDescription: document.getElementById('briefDescription').value,
      detailedDescription: document.getElementById('detailedDescription').value,
      details: [document.getElementById('productAttribute-0').value,document.getElementById('productAttribute-1').value,document.getElementById('productAttribute-2').value,document.getElementById('productAttribute-3').value],
      productAttributes: {

        details: [],

        sizes: sizeArr,
        colors: colorArr,
        photos: photoData,
      }
    }));
  }
}//end add new product

handleRemoveProduct(){
  return this.props.handleRemoveProductClick(this.props.currentItem);
}


handlePhotoFilesUpdate(filesArr){
  let sizeArr = [];
  document.getElementById('size-S').className === "editSizeButtonPushed" ? sizeArr.push('S') : '';
  document.getElementById('size-M').className === "editSizeButtonPushed" ? sizeArr.push('M') : '';
  document.getElementById('size-L').className === "editSizeButtonPushed" ? sizeArr.push('L') : '';
  document.getElementById('size-XXL').className === "editSizeButtonPushed" ? sizeArr.push('XXL') : '';

  let colorArr = [];
  document.getElementById('color-red').className === "colorButtonPushed" ? colorArr.push('red') : '';
  document.getElementById('color-blue').className === "colorButtonPushed" ? colorArr.push('blue') : '';
  document.getElementById('color-black').className === "colorButtonPushed" ? colorArr.push('black') : '';



  console.log('UPDATING STATE.PHOTOFILES:')
  console.log(filesArr)
  let newPhotosArr = this.state.photoFiles.map(e => e);
  filesArr.forEach( (e,index) => {
    if(filesArr.length === index+1){
      newPhotosArr.push(e)
       //updateCurrentItemPhotos(newPhotosArr, this.props.dispatch)
       console.log(newPhotosArr)
       return this.setState({photoFiles: newPhotosArr})
    }else{newPhotosArr.push(e)}
  })
}

handlePhotoFilesRemove(filesArr){
 return this.setState({photoFiles: filesArr})
}

displayButtons(){
  if(this.props.newProductEdit){
    return(
      <div className="rowCentered" id="updateButtons">
        <a href="#" className="editProductButton" id="newProduct" onClick={this.handleAddNewProduct}>Create New Product</a>
      </div>
    )
  }else{
    return(
      <div className="rowCentered" id="updateButtons">
        <button  className="editProductButton" id="removeProduct" onClick={this.handleRemoveProduct}>Remove</button>
        <a href="#" className="editProductButton" id="updateProduct" onClick={this.handleUpdateProduct}>Update</a>
      </div>
    )
  }
}

displayNewProductNameInput(){
  return(
    <p>Name: <input type="text" id="newProductName" placeholder="name for your new product"/></p>
  )
}

render(){
  console.log('product edit render')
  console.log(this.props)

  return(
    <div className="pageColumn">

    <div className="rowCentered">
    {this.props.newProductEdit ? this.displayNewProductNameInput(): <h4>{this.props.currentItem.name}</h4>}

    </div>
    <div className="rowCentered">
      <Details currentItem={this.props.currentItem} newProductEdit={this.props.newProductEdit}/>

      <Sizes currentItem={this.props.currentItem} newProductEdit={this.props.newProductEdit}/>
      <Colors currentItem={this.props.currentItem} newProductEdit={this.props.newProductEdit}/>
    </div>

    <div className="rowCentered" style={{"marginTop": "100px", "marginBottom": "100px"}}>
      <Photos photoFiles={this.state.photoFiles.map(e => e)} currentItem={this.props.currentItem} handlePhotoFilesRemove={this.handlePhotoFilesRemove} newProductEdit={this.props.newProductEdit} handlePhotoFilesUpdate={this.handlePhotoFilesUpdate} />
    </div>


    <div className="rowcentered">

    <Price currentItem={this.props.currentItem} newProductEdit={this.props.newProductEdit} />

    </div>
    <div className="rowCentered">
      <BriefDescription currentItem={this.props.currentItem} newProductEdit={this.props.newProductEdit} />
    </div>


    <div className="rowCentered">
      <DetailedDescription currentItem={this.props.currentItem} newProductEdit={this.props.newProductEdit} />
    </div>


    {this.displayButtons()}


  </div>

  )
 }
}




const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( ProductEdit );
