import React, { Component } from 'react';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoginInfo} from '../actions/loginActions';

class SignIn extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleLogin(){
    this.props.setLoginInfo();
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
        <Button className="signIn" onClick={this.handleLogin.bind(this)}>Log in</Button>

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

  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
