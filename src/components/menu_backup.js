import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
// import {LinkContainer} from 'react-router-bootstrap';
import '../App.css';


class Menu extends React.Component{
  constructor() {
    super()
    this.state = {
      from: 1,
      to: ''
    }
  }
  renderLine(){
    //return <div className="headerAnimation" />

  }
  onPressNav1(){
    this.setState({from:1})
  }
  onPressNav2(){
    this.setState({from:2})
  }
  onPressNav3(){
    this.setState({from:3})
  }
  onPressNav4(){
    this.setState({from:4})
  }

  render(){
    return(
      <Navbar inverse fixedTop className={(this.props.scrollY===0)?("headerOnTop"):("header")}>
    		<Navbar.Header className="headerLogo">

    				<a href="/">NTNU Utveklsing</a>

    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>
    			<Nav pullLeft>

      				<NavItem eventKey={1}  onSelect={this.onPressNav1.bind(this)} className="headerItem">
                Hjem
                {this.state.from === 1 ? (this.renderLine()):('')}
      				</NavItem>
              <NavItem eventKey={1} onSelect={this.onPressNav2.bind(this)} className="headerItem">
                Statestikk
                {this.state.from == 2 ? (this.renderLine()):('')}
      				</NavItem>
      				<NavItem eventKey={2}  onSelect={this.onPressNav3.bind(this)} className="headerItem">
      					Kontakt oss
                {this.state.from === 3 ? (this.renderLine()):('')}

      				</NavItem>


    			</Nav>
          <Nav pullRight>

      				<NavItem eventKey={4}  href="/cart" onSelect={this.onPressNav4.bind(this)} className="headerItem">
                Din profil
                {this.state.from === 4 ? (this.renderLine()):('')}
      				</NavItem>

    			</Nav>


    		</Navbar.Collapse>
    	</Navbar>
    );
  }
}
export default Menu;
