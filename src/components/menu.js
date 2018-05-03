import React from 'react';
import {Nav, NavItem, Navbar, Badge, OverlayTrigger, Popover, MenuItem, NavDropdown} from 'react-bootstrap';
// import {LinkContainer} from 'react-router-bootstrap';
import '../App.css';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoginInfo, setLoginFalse} from '../actions/loginActions';
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
  logOut(){
    this.props.setLoginFalse()
    this.props.cookie.remove("hasLogin")
  }

  render(){
    const popoverHoverFocus = (
  <Popover id="popover-trigger-hover-focus">
    View your stated universities.
  </Popover>

);
const title = (
  <h4 style={{color: 'white'}}>Statistikk</h4>
);
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
                <Link to="/kor" onClick={this.onPressNav1.bind(this)}>

                <h4 style={{color: 'white'}}>Koroplet kart</h4>
                {this.state.from == 2 ? (this.renderLine()):('')}
              </Link>
      				</NavItem>
              <NavItem eventKey={1} onSelect={this.onPressNav2.bind(this)} className="headerItem">
                <Link to="/stat" onClick={this.onPressNav1.bind(this)}>

                <h4 style={{color: 'white'}}>Kostnadsanalyse</h4>
                {this.state.from == 2 ? (this.renderLine()):('')}
              </Link>
      				</NavItem>
      				{/* <NavItem eventKey={2}  onSelect={this.onPressNav3.bind(this)} className="headerItem">

                <h4 style={{color: 'white'}}>Kontakt oss</h4>
                {this.state.from === 3 ? (this.renderLine()):('')}

      				</NavItem> */}


    			</Nav>
          <Nav pullRight>

      				<NavItem eventKey={4}  onSelect={this.onPressNav4.bind(this)} className="headerItem">
                {(this.props.mail.length > 0)?(
                <Link to="/cart">
                  {/* <img src={require('../images/profile.png')} style={{height: 30}} /> */}
                  <OverlayTrigger
                      trigger={['hover', 'focus']}
                      placement="bottom"
                      overlay={popoverHoverFocus}
                    >
                  <h4 style={{color: 'white'}}>Min profil</h4>
                </OverlayTrigger>
                {this.state.from === 4 ? (this.renderLine()):('')}
                </Link>
              ):(
                <NotLoggedIn />
              )}


      				</NavItem>
  {(this.props.mail.length > 1)?(
              <NavItem eventKey={4}  onSelect={this.onPressNav4.bind(this)} className="headerItem">
                <Link to="/">
                  {/* <img src={require('../images/profile.png')} style={{height: 30}} /> */}
                  <h4 style={{color: 'white'}} onClick={this.logOut.bind(this)}>Logg ut</h4>

                {this.state.from === 4 ? (this.renderLine()):('')}
              </Link>

            </NavItem>):('')}

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
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setLoginFalse: setLoginFalse,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
