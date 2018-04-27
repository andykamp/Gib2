import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BeatLoader } from 'react-spinners';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Footer from './components/footer';
import Menu from './components/menu';
import SignIn from './components/signIn';
import {Glyphicon,FormGroup, form, FormControl, Grid, Col, Row, Button} from 'react-bootstrap';


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


class App extends Component {
  constructor() {
    super()
    this.state = {
      scrolly: 0,
      firstTime: true,
      showModal: false,
      loadSpinner:true,
      animatePlane:true,
      showInfo: false,
    }
  }

  componentWillMount(){
  }

  componentDidMount(){
      //------listener for scroll used in header ect----------
      window.addEventListener('scroll', this.handleScroll.bind(this));
      //sets timeout for loadingscreen
      setTimeout(function() { this.setState({firstTime: false}); }.bind(this), 2000);

      //if we are not logged in open login
      if(!this.props.loggedIn){
        this.setState({showModal:true});
      }
  }
  componentWillReceiveProps(nextProps){
    //if user is logged in--> set timer for the modal to close
    if(nextProps.loggedIn == true){
       const that=this;
         setTimeout(function(){
           that.setState({showModal: false, showInfo:true});
       }, 1000);    }
   // this.setState({showModal: false});

  }

  componentWillUnmount(){
    //remove listener
    window.removeEventListener('scroll', this.handleScroll);

  }

  handleScroll(event) {
    this.setState({scrolly:window.scrollY})
  }

renderinfo(){
  console.log('renderpopup');

}

  render() {
    const intViewportHeight = window.innerHeight;
    let scroll = window.scrollY;

      return (
        <div className="wholescreenApp" >
          {/* Renders startupscreen if first time enterin */}
          {/* Login modal */}
          <Modal
           isOpen={this.state.showModal}
           style={this.props.loggedIn?(animationStyles):(customStyles)}
           >
            <div className='login'>

              <SignIn/>
            </div>
          </Modal>
          {(this.state.showInfo) ? (
            <div style={{
              position: 'absolute',
              right:'50vw',
              top:intViewportHeight + scroll-80,
              height: 70,
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              alignitems: 'center',
              justifyContent: 'flex-start',
              backgroundColor: '#2a3446',
              color: 'white',
              borderRadius: 5,
              padding: 10,
              zIndex: 10,
              animation: 'flyUpInfo 200ms ease-in'
            }} >
              <div className="tutorialPopupExit">
                <a className='exitTutorial' onClick={()=> this.setState({showInfo:false})}><Glyphicon style = {{color:'white'}} glyph="glyphicon glyphicon-remove" /></a>
              </div>
              <p style= {{marginTop:13}}>Use the searchbar or the dynamic map to find your university.</p>

            </div>
          ):("")}
          <Menu scrollY={this.state.scrolly}/>
            {this.props.children}
          <Footer />
        </div>

    );
  }
}

function mapStateToProps(state){
  return {
    loggedIn: state.login.loggedIn
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
