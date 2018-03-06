import React from 'react';
// import {LinkContainer} from 'react-router-bootstrap';
import '../App.css';
import {Link} from 'react-router';


class Menu extends React.Component{
  constructor() {
    super()
    this.state = {
      from: 1,
      to: ''
    }
  }
  renderLine(){
    // return <div className= "headerAnimation" />

  }
  onPressdiv1(){
    this.setState({from:1})
  }
  onPressdiv2(){
    this.setState({from:2})
  }
  onPressdiv3(){
    this.setState({from:3})
  }
  onPressdiv4(){
    this.setState({from:4})
  }

  render(){
    return(
      <div  className={(this.props.scrollY===0)?("headerOnTop"):("headerOnTop")}>

    			<div className="headerButton">

      				<div  onClick={this.onPressdiv1.bind(this)} className="headerItem">
                Hjem
                {this.state.from === 1 ? (this.renderLine()):('')}
      				</div>
              <div  onClick={this.onPressdiv2.bind(this)} className="headerItem">
                Statestikk
                {this.state.from == 2 ? (this.renderLine()):('')}
      				</div>

    			</div>
          <div className="headerLogo">

      				<Link to="/" onClick={this.onPressdiv1.bind(this)}>
              <img src={require('../images/logo.png')} style={{height: 40}} />
              </Link>

      		</div>
          <div className="headerButton">

      				<div  onClick={this.onPressdiv4.bind(this)} className="headerItem">
                <Link to="/cart">
                  Min profil
                </Link>
                {this.state.from === 4 ? (this.renderLine()):('')}
      				</div>

    			</div>


    	</div>
    );
  }
}
export default Menu;
