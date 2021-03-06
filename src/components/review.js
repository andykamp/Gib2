import React from 'react';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart, deleteCartItem} from '../actions/cartActions';

class Review extends React.Component{
  constructor(){
    super();
    this.state = {
      showModal: false,
      form:'',
    };
  }
  //--------Modal---------

  //opens/closes the modal
  open(){
    this.setState({showModal:true})
  }
  close(){
    this.setState({showModal: false})
  }





  render() {
    const tilbakemelding = "Godt universitet med gode forelesninger og godt studiemiljø for utenlandske studenter. Mye interessante fag."
    console.log('JSDHFGKJBSNALJS', this.props.summary);
    return(
      <div>
      <div className="infoRowPointer" onClick={()=> this.setState({showModal:true})}>
        <img src={require('../images/chat.png')} style={{height: 30,marginBottom: 0, marginRight: 5}}/>
        <div className="infoCol">
          <div className="infoRow">
            <h6 style={{marginRight: 5}}>{this.props.stud_dir}</h6>
            <h6>{this.props.date}</h6>
          </div>
          <p>{this.props.summary.length >0 ?this.props.summary.substring(0,50) + "..." : '...'}</p>
        </div>
      </div>
        {/* Review modal */}
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Tilbakemelding</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FormGroup controlId="formControlsTextarea">
              <div className="infoRowPointer" onClick={()=> this.setState({showModal:true})}>
                <img src={require('../images/profil.png')} style={{height: 60,marginBottom: 0, marginRight: 5}}/>
                <div className="infoCol">
                  <div className="infoRow">
                    <h6 style={{marginRight: 5}}>{this.props.stud_dir}</h6>
                    <h6>{this.props.date}</h6>
                  </div>
                  <p>{this.props.summary}</p>
                </div>
              </div>
            </FormGroup>

          </Modal.Body>
          <Modal.Footer>
            <Button><a href={this.props.link} target="_blank">Se full</a></Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}
function mapStateToProps(state){
  return {
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Review);
