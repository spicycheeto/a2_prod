import React, {Component} from 'react'
import { connect } from "react-redux";


class ProductSelectionDisplay extends Component {

  constructor(props){
    super(props)

    this.state = {dropDownDivs: [], checkBoxExample: []}
    //checkBoxExample: [{name: "Meat Toppings:", type:"multi", data: ["Pepperoni","Sausage","Ham","Anchovies"]}, {name: "Choose your monsters features:", type:"multi", data: ["scales","horns","eyes","tail"]}]
    this.buildDropDownDivs = this.buildDropDownDivs.bind(this)
    this.displayCheckBoxRows = this.displayCheckBoxRows.bind(this)
  }

componentWillMount(){
  console.log('componentWillMount')


}
componentwillUpdate(){
  console.log('componentwillUpdate')

}

//builds rows of drop down lists. 2 drop down lists per row.
buildDropDownDivs(){


  let newDropDownDivs = this.state.dropDownDivs.map(e => e)

  if(Array.isArray(this.props.productObj.dropDownSelections)){

    if(this.props.productObj.dropDownSelections.length == 1){

      let tmp = this.props.productObj.dropDownSelections.pop();



      newDropDownDivs.push(

        <div className="pageRow">
        {tmp.data.lengh > 0 ? <select className="dropDownSelection" name={tmp.name} id={tmp.name}>
        <option value="default">{tmp.name}</option>
        {tmp.data.map(option => {
          return(<option value={option}>{option}</option>)
        })}
        </select>: ''}
        </div>
      )

      this.setState({dropDownDivs: newDropDownDivs})

    }else if(this.props.productObj.dropDownSelections.length > 1){


      let tmp = this.props.productObj.dropDownSelections.pop();
      let tmp2 = this.props.productObj.dropDownSelections.pop();




      newDropDownDivs.push(
        <div className="pageRow">
          {tmp.data.length > 0 ? <select className="dropDownSelection" name={tmp.name} id={tmp.name}>
          <option value="default">{tmp.name}</option>
          {tmp.data.map(option => {
            return(<option value={option}>{option}</option>)
          })}

          </select> : ''}
          {tmp2.data.length > 0 ? <select className="dropDownSelection" name={tmp2.name} id={tmp2.name}>
            <option value="default">{tmp2.name}</option>
            {tmp2.data.map(option => {
              return(<option value={option}>{option}</option>)
            })}
            </select>: ''}
      </div>
      )

        this.setState({dropDownDivs: newDropDownDivs})
    }

 }
}

/* displays an array of drop down lists.
  displayDropDownDivs(){

    if(Array.isArray(this.props.productObj.radioSelections)){
      return(
    this.props.productObj.radioSelections.map( (e,index) => {

      return(

        <select className="dropDownSelection" name="dropDownList" id="1">
          <option value="default">{e.name}</option>
          {e.data.map(option => {
            return(<option value={option}>{option}</option>)
          })}
        </select>
      )
    }))
   }
  }
*/

displayCheckBoxRows(){

  if(Array.isArray(this.state.checkBoxExample)){
    return(
  this.state.checkBoxExample.map( (e,index) => {//Check box's will normally be a prop which we pop elements off of and place into state.

    return(


        <div className="checkBoxDiv" id="example">
        <p className="checkBoxTitle">{e.name}</p>

        <div>

          {e.data.map(option => {
            return(
              <label for={option}>{option}
              <input className="checkBox" type="checkbox" id={option} name={option} />
              </label>

            )

          })}
        </div>

      </div>


    )

  }))
 }
}

/*
<select className="dropDownSelection" name="dropDownList" id="1">
  <option value="default">{e.name}</option>
  {e.data.map(option => {

    return(<option value={option}>{option}</option>)

  })}

</select>
*/

render(){

console.log(this.props.productObj)
  return(
    <div className="productOptionsRow" id="selectionSection">



      {this.buildDropDownDivs()}
      {this.state.dropDownDivs.length >= 1 ? <div className="optionsCenteredColumn" id="singleSelections">{this.state.dropDownDivs.map(e => e)}</div> : ""}
      {this.state.checkBoxExample.length >= 1 ? <div className="optionsCenteredColumn" id="checkboxes">{this.displayCheckBoxRows()}</div> : ""}



    </div>

  )
 }
}



const mapStateToProps = ( state ) => ( {
    loggedIn: state.loggedIn,
    data: state.data,
} );

const mapDispatchToProps = {}



export default connect( mapStateToProps )( ProductSelectionDisplay );
