import React from 'react';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart, deleteCartItem} from '../actions/cartActions';

class NoteItem extends React.Component{
  constructor(){
    super();
    this.state = {
      isClicked:false,
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

  onReadMore(){
    this.setState({
      isClicked:true
    })
  }
  //---cart functions-------

  //handles editing/updating the note to cart
  handleNoteEdit(){
    this.props.updateCart(this.props._id, this.state.form.note);
    this.close()
  }


  //deletes note
  onDeleteNote(_id){
    const currentCartToDelete = this.props.cart
    //Determine at wich index in books array is the book to be deleted
    const indexToDelete = currentCartToDelete.findIndex(
      function(cart){
        return cart._id === _id
      }
    )
    //uses slice to remove the book at the specified indexToDelete
    let cartAfterDelete = [...currentCartToDelete.slice(0,indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)];
    //returns the new array to reducer
    this.props.deleteCartItem(cartAfterDelete);
  }

  handleTextChange(event){
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fleldVal}})
  }

  render() {
    console.log('note', this.state.form.note);

    return(
      <div>
        <Row style={{width: '40vw'}}>
            <h6>{this.props.title}</h6>
            <p>{(this.props.note.length> 50 && !this.state.isClicked)?(this.props.note.substring(0,50)):(this.props.note)}
              <btton className="link" onClick={this.onReadMore.bind(this)}>
                {(!this.state.isClicked && this.props.note !== null && this.props.note.length > 50)?('...read more'):('')}
              </btton>
            </p>
            <Button onClick={this.onDeleteNote.bind(this, this.props._id)} bsStyle="danger" bsSize="small">Slett</Button>
            <Button onClick={this.open.bind(this)} bsStyle="danger" bsSize="small">endre...</Button>
        </Row>
        {/* Note modal */}
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Endre notat</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Notat</ControlLabel>
              <FormControl componentClass="textarea" defaultValue={this.props.note} name="note" onChange={this.handleTextChange.bind(this)}/>
            </FormGroup>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleNoteEdit.bind(this)}>Legg til</Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    cart: state.cart.cart
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addToCart: addToCart,
    updateCart: updateCart,
    deleteCartItem: deleteCartItem,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);
