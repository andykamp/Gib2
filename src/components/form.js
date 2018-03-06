"user strict"
import React from 'react';
import '../App.css';
import {Well, Panel, FormGroup, ControlLabel, FormControl, HelpBlock, Jumbotron, Grid, Col, Row, Button} from 'react-bootstrap';

class Form extends React.Component{
  constructor() {
		super();
		this.state = {
			retning: '',
      tekst: '',
		};
	}

	getValidationState() {
		const length = this.state.retning.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
		return null;
	}
  getValidationStateTekst() {
		const length = this.state.tekst.length;
		if (length > 10) return 'success';
		else if (length > 5) return 'warning';
		else if (length > 0) return 'error';
		return null;
	}

	handleChangeText(e) {
    this.setState({ tekst: e.target.tekst })
	}
  handleChangeRetning(e) {
    this.setState({ retning: e.target.retning })
	}

  render(){
    return(

      <Row className="cointainerForm">
        <Row style={{padding: 10, textAlign: 'center', verticalAlign: 'middle'}}>
        </Row>
        <Col xs={12} sm={6} md={6}>
          <Jumbotron style={{height: 400, backgroundColor: '#fff', color: '#2a3446'}} >
        		<h1>Del erfaringer</h1>
        		<p>
        			Hjelp medstudenter ved å dele dine erfaringer!
        		</p>
      	   </Jumbotron>
        </Col>
        <Col xs={12} sm={6} md={6}>
          <Panel  style={{height: 400, backgroundColor: '#fff', color: '#2a3446', border:0}}>

      			<Panel.Body>
        				<FormGroup
        					controlId="formBasicText"
        					// validationState={this.getValidationState()}
        				>
        					<ControlLabel>Studieretning</ControlLabel>
        					<FormControl
        						type="text"
        						value={this.state.retning}
        						placeholder="studieretning..."
        						onChange={this.handleChangeRetning.bind(this)}
        					/>
        					<FormControl.Feedback />
        				</FormGroup>
                <FormGroup
        					controlId="formBasicText"
        					// validationState={this.getValidationStateTekst()}
        				>
        					<ControlLabel>Dine erfaringer</ControlLabel>
        					<FormControl
        						type="text"
        						value={this.state.tekst}
        						placeholder="erfaringer..."
        						onChange={this.handleChangeText.bind(this)}
                    style={{height: 250}}
        					/>
        					<FormControl.Feedback />
        					<HelpBlock>Teksten må være lengre enn 50 bokstaver</HelpBlock>
        				</FormGroup>
            </Panel.Body>
      		</Panel>
        </Col>
      </Row>

    );
  }
}
export default Form;
