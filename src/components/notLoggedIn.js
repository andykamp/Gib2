import React from 'react';
import {Glyphicon,Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {Link} from 'react-router';
import ReactModal from 'react-modal';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoginFalse} from '../actions/loginActions';
import SignIn from './signIn';
//costum class for Modal
const customStyles = {
  overlay : {
      position          : 'absolute',
      zIndex           : 10,
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)',
        // animation: 'flyleft 3s ease-in',
      overflow:'visible',

    },
    content : {
      position                   : 'absolute',
      top                        : '0px',
      left                       : '0px',
      right                      : '0px',
      bottom                     : '0px',
      border                     : '1px solid #ccc',
      background                 : '#2a3446',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px',
      overflow:                   'visible',

    }
};
const animationStyles = {
  overlay : {
      position          : 'absolute',
      zIndex           : 10,
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)',
      animation: 'flyUp 1s ease-in',
      overflow:'visible',

    },
    content : {
      position                   : 'absolute',
      top                        : '0px',
      left                       : '0px',
      right                      : '0px',
      bottom                     : '0px',
      border                     : '1px solid #ccc',
      background                 : '#2a3446',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px',
      overflow:                   'visible',

    }
};

class NotLoggedIn extends React.Component{
  constructor(){
    super();
    this.state = {
      isClicked:false,
      showModal: false,
      showSignIn: false,
      form:'',
    };
  }

  componentWillReceiveProps(nextProps){
    //if user is logged in--> set timer for the modal to close
    if(nextProps.loggedIn == true){
       const that=this;
         setTimeout(function(){
           that.setState({showSignIn: false});
       }, 1000);    }
   // this.setState({showModal: false});

  }
  //--------Modal---------

  //opens/closes the modal
  open(){
    this.setState({showModal:true})
  }
  close(){
    this.setState({showModal: false})
  }

login(){
  this.close()
  this.props.setLoginFalse()
  this.setState({showSignIn:true})
}

  render() {
    console.log('note', this.state.form.note);

    return(
      <div>
        <Link onClick={this.open.bind(this)}>
          {/* <img src={require('../images/profile.png')} style={{height: 30}} /> */}
          <h4 style={{color: 'white'}}>Login</h4>

        </Link>


        {/* Note modal */}
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Du er ikke logget inn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="infoRowHeader">
              <Glyphicon glyph="glyphicon glyphicon-user" />
              </Row>
            <Row className="infoRowHeader">
              <p>For å legge til eller se dine universiteter må du logge inn.</p>

            </Row>
            <Row className="infoRowHeader">
              <Button onClick={this.login.bind(this)}>Logg inn</Button>

            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

        <ReactModal
         isOpen={this.state.showSignIn}
         style={this.props.loggedIn?(animationStyles):(customStyles)}
         >
          <div className='login'>

            <SignIn/>
          </div>
        </ReactModal>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    loggedIn: state.login.loggedIn
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setLoginFalse: setLoginFalse,

  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(NotLoggedIn)
