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
            <div className="turtorialPopup">
              <div className="turtorialPopupExit">
                <img src={require('./images/exit.png')} style={{height: 20, marginLeft:0 }} onClick={()=> this.setState({showInfo:false})}/>
              </div>
              <p style= {{marginTop:10}}>Use the dynamic map to find your universities</p>

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
