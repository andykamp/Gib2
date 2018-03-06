import React, { Component } from 'react';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoginInfo, ContinueWithoutLogin} from '../actions/loginActions';

class SignIn extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      validation: false
    };
  }

  getValidationState() {
    const mail = this.state.value
    if (mail.includes('@stud.ntnu.no')) return 'success';
    else return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleLogin(){
    if(this.state.value.includes('@stud.ntnu.no')) {
    this.props.setLoginInfo(this.state.value);
  }
  }
  handleContinueWithoutLogin(){
    this.props.ContinueWithoutLogin(this.state.value);
  }

  render() {
    return (
      <form className="signIn">
        <img src={require('../images/logo.png')} style={{height: '10vh'}} />
        <h2 style={{color: 'white'}}>Velkommen</h2>
        <p style={{color: 'white', textAlign: 'center'}}>Logg deg inn med studieretning for å at vi kan tilrettelegge bedre for deg</p>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
        </FormGroup>
        <Button className="signIn" onClick={this.handleLogin.bind(this)}>Logg in</Button>
        <p style={{color: 'white'}} onClick={this.handleContinueWithoutLogin.bind(this)}>Fortsett uten innlogging</p>

      </form>
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
    setLoginInfo: setLoginInfo,
    ContinueWithoutLogin: ContinueWithoutLogin
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
