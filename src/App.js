import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Footer from './components/footer';
import Menu from './components/menu';



class App extends Component {
  constructor() {
    super()
    this.state = {
      scrolly: 0,
      firstTime: true,
    }
  }
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
  renderLoad(){
    if(this.state.firstTime){
      return (
        <div className="loading" >
          <h1>Hei</h1>
        </div>
      );
    } else
      return

  }
  render() {

      return (
        <div className="wholescreenApp" >
          {/* Renders startupscreen if first time enterin */}
          {/* {this.renderLoad()} */}
          <Menu scrollY={this.state.scrolly}/>
            {this.props.children}
          <Footer />
        </div>

    );
  }
}

export default App;
