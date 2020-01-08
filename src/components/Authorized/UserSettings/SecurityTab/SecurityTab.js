import React, {Component} from 'react'
import { connect } from "react-redux";
import { removeData } from '../../../../store.js';
import TwoFactor from './TwoFactor/TwoFactor.js';


class SecurityTab extends Component {

  constructor(props){
    super(props)

    this.state = {twofaModal: false}


    this.handle2faSwitchClick = this.handle2faSwitchClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.forceRemoveModal = this.forceRemoveModal.bind(this);
    this.removeMessages = this.removeMessages.bind(this);
  }

twofaModal(){

  return <TwoFactor hideModal={this.hideModal} twofaModal={this.state.twofaModal} forceRemoveModal={this.forceRemoveModal}/>;

}


removeMessages(){
  this.props.data.map(e => {
    if(e.name === "settingsUpdate"){
      removeData('settingsUpdate', this.props.dispatch)
    }
    if(e.name === "Fail"){
      removeData('Fail', this.props.dispatch)
    }
  })
}

hideModal(event){
  this.removeMessages();
  if(event.target.id === "2fa"){
    this.setState({twofaModal: false})
  }
}

forceRemoveModal(){
  this.removeMessages();
  this.setState({twofaModal: false})
}

handle2faSwitchClick(){
  console.log('handle2faModalClick')
  this.setState({twofaModal: true})

}


load2faSwitch(){

return(
  this.props.data.map(e => {

    if(e.name === 'userData'){

      if(e.twofa){
        return(<label className="switch" >
          <input type="checkbox" checked onClick={this.handle2faSwitchClick}/>
          <span className="slider round" ref="twofaswitch" ></span>
        </label>
       )
    }else{
      return(
        <label className="switch" >
          <input type="checkbox" onClick={this.handle2faSwitchClick}/>
          <span className="slider round" ref="twofaswitch" ></span>
        </label>
      )
    }
  }}))
}


render(){

console.log(this.props.data)

  return(
    <div className="pageContainer" >
      {this.state.twofaModal ? this.twofaModal() : ''}
      <div className="pageRow" style={{"justifyContent": "center", "alignItems": "center", "justifyContent": "space-evenly" }}>

        <h3>2FA</h3>

        {this.load2faSwitch()}

      </div>


      <div className="pageRow">
        cookie Timeout
      </div>

      <div className="pageRow">
        Email Notifications
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



export default connect( mapStateToProps )( SecurityTab );
