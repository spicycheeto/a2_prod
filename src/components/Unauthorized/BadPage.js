import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class BadPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {bad: null}

    this.loadPage = this.loadPage.bind(this);
  }


loadPage(){

  { setTimeout(function () {
          document.location = "http://localhost:3333";
    }, 2000) }


}

blah(){
  return console.log(document.location)
}

componentWillMount(){
  console.log('badpage:');
  if(this.props.location){
    const path = this.props.location
    this.setState({bad: path.pathname})
  }

}
//{document.location === '/bad' ? this.loadPage() : ''}
  render(){


    return(
      <div>

        {this.state.bad === '/bad' ? this.blah() : 'not bad'}

      </div>
    )

  }

}



const mapStateToProps = ( state ) => ({

  loggedIn: state.loggedIn,
  data: state.data

});


export default connect(mapStateToProps)(BadPage);
