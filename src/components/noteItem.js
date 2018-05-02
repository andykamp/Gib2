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
        return cart[0] === _id
      }
    )
    console.log('indexToDelete',indexToDelete)
    //uses slice to remove the book at the specified indexToDelete
    let cartAfterDelete = [...currentCartToDelete.slice(0,indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)];
    //returns the new array to reducer
    console.log('cartAfterDelete', cartAfterDelete);
    this.props.deleteCartItem(_id, cartAfterDelete, this.props.mail, this.props.uni._id );
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
        <Row style={{width: '100%', margin: 20}}>
            <p>{(this.props.note.length> 50 && !this.state.isClicked)?(this.props.note.substring(0,50)):(this.props.note)}
                {(!this.state.isClicked && this.props.note !== null && this.props.note.length > 50)?(<strong clasname="pointerhover" style={{fontWeight: 'bold'}} onClick={this.onReadMore.bind(this)}>...read more</strong>):('')}

            </p>
            <Button onClick={this.onDeleteNote.bind(this, this.props._id)} bsStyle="danger" bsSize="small">Slett</Button>
            {/* <Button onClick={this.open.bind(this)} bsStyle="danger" bsSize="small">endre...</Button> */}
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
            {/* <Button onClick={this.handleNoteEdit.bind(this)}>Legg til</Button> */}
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    cart:state.profile.notes,
    uni: state.university.university,
    mail: state.login.mail,
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
