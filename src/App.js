import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Footer from './components/footer';
import Menu from './components/menu';
class App extends Component {
  constructor() {
    super()
    this.state = {
      scrolly: 0
    }
  }
  componentDidMount(){
      window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);

  }

  handleScroll(event) {
    this.setState({scrolly:window.scrollY})
  }

  render() {
      return (
        <div className="wholescreen" >
          <Menu scrollY={this.state.scrolly}/>
            {this.props.children}
          <Footer />
        </div>

    );
  }
}

export default App;
