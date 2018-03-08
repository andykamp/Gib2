import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
// import {LinkContainer} from 'react-router-bootstrap';
import '../App.css';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoginInfo} from '../actions/loginActions';
import NotLoggedIn from './notLoggedIn'
class Menu extends React.Component{
  constructor() {
    super()
    this.state = {
      from: 1,
      to: ''
    }
  }
  renderLine(){
    // return <div className="headerAnimation" />

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

    				<Link to="/" onClick={this.onPressNav1.bind(this)}>
            <img src={require('../images/logo.png')} style={{height: 40}} />
            </Link>

    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>
    			<Nav pullLeft>

      				<NavItem eventKey={1}  onSelect={this.onPressNav1.bind(this)} className="headerItem">
                <Link to="/" onClick={this.onPressNav1.bind(this)}>
                  <h4 style={{color: 'white'}}>Hjem</h4>

                  {this.state.from === 1 ? (this.renderLine()):('')}
                </Link>

      				</NavItem>
              <NavItem eventKey={1} onSelect={this.onPressNav2.bind(this)} className="headerItem">
                <Link to="/stat" onClick={this.onPressNav1.bind(this)}>

                <h4 style={{color: 'white'}}>Statistikk</h4>
                {this.state.from == 2 ? (this.renderLine()):('')}
              </Link>
      				</NavItem>
      				<NavItem eventKey={2}  onSelect={this.onPressNav3.bind(this)} className="headerItem">

                <h4 style={{color: 'white'}}>Kontakt oss</h4>
                {this.state.from === 3 ? (this.renderLine()):('')}

      				</NavItem>


    			</Nav>
          <Nav pullRight>

      				<NavItem eventKey={4}  onSelect={this.onPressNav4.bind(this)} className="headerItem">
                {(this.props.mail.length > 0)?(
                <Link to="/cart">
                  {/* <img src={require('../images/profile.png')} style={{height: 30}} /> */}
                  <h4 style={{color: 'white'}}>Min profil</h4>

                {this.state.from === 4 ? (this.renderLine()):('')}
                </Link>
              ):(
                <NotLoggedIn />
              )}

      				</NavItem>

    			</Nav>


    		</Navbar.Collapse>
    	</Navbar>
    );
  }
}

function mapStateToProps(state){
  return {
    mail: state.login.mail
  }
}
export default connect(mapStateToProps, null)(Menu);
