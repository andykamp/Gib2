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
      background                 : '#95CAFE',
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
        animation: 'flyleft 3s ease-in',
      overflow:'visible',

    },
    content : {
      position                   : 'absolute',
      top                        : '0px',
      left                       : '0px',
      right                      : '0px',
      bottom                     : '0px',
      border                     : '1px solid #ccc',
      background                 : '#95CAFE',
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
    }
  }

  componentWillMount(){
    //timer for Modal
    // const that=this;
  //   setTimeout(function(){
  //     that.setState({showModal: false});
  // }, 3000);
  }

  //------listener for scroll used in header ect----------
  componentDidMount(){
      window.addEventListener('scroll', this.handleScroll.bind(this));
      //sets timeout for loadingscreen
      setTimeout(function() { this.setState({firstTime: false}); }.bind(this), 2000);

  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);

  }

  handleScroll(event) {
    this.setState({scrolly:window.scrollY})
  }
  //---------------------------------------------------------



  render() {
      return (
        <div className="wholescreenApp" >
          {/* Renders startupscreen if first time enterin */}
          {/* Login modal */}
          <Modal
           isOpen={this.props.loggedIn}
           style={this.props.loggedIn?(animationStyles):(customStyles)}
           >
            <div className='login'>
              {/* If we animate slide we animate the pain */}
              {this.props.loggedIn ?(<img src={require('./images/plane.png')} className="introPlane" />):('')}
              <SignIn/>
            </div>
          </Modal>

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
