import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
// import {LinkContainer} from 'react-router-bootstrap';

class Menu extends React.Component{
  render(){
    return(
      <Navbar inverse fixedTop className={(this.props.scrollY===0)?("headerOnTop"):("header")}>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<a href="/">NTNU Utveklsing</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>
    			<Nav>
    				<NavItem eventKey={1}>
    					About
    				</NavItem>
    				<NavItem eventKey={2} >
    					Contact Us
    				</NavItem>

    			</Nav>

    		</Navbar.Collapse>
    	</Navbar>
    );
  }
}
export default Menu;
