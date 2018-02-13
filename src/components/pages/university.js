"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, addToCart, updateCart, addLinkToCart, deleteLinkItem} from '../../actions/cartActions';

import NoteItem from '../noteItem';
import LinkItem from '../linkItem';
import UnInfo from '../universitetsInfo';

class University extends React.Component{
  //constructor fro modal state
  constructor(){
    super();
    this.state ={
      showModal: false,
      showLinkModal: false,
      note: '',
      link:'',
      form:'',
    }
  }
//-----adding cart tobject
//handles adding to note to cart
handleNoteAdd(){
  const item = [...this.props.cart, {
    _id: 1,
    title: 'title',
    note: this.state.form.note,
  }]
  if(this.state.form){
    //CHECK IF CART IS renderEmpty
    if(this.props.cart.length > 0){
      //CART IS NOT EMPTY
      let _id= this.props._id;
      //checks if item exist from before
      let cartIndex = this.props.cart.findIndex(function(cart){
        return cart._id === _id;
      })
      //IF RETURNS -1 THERE AR ENO ITEMS ITH SAME ID
      //then we add to cart
      if(cartIndex === -1){
        this.props.addToCart(item);
      } else {
        //WE NEED TO UPDATE QUANTITY
        this.props.updateCart(_id, 1);

      }
    } else {
      //cart is empty so its safe to post the item
      this.props.addToCart(item);

    }
  }
  //close modal
  this.close();
}
//-----link funcitons
  //handle link adding to cart
  handleLinkAdd(){
    const item = [...this.props.link, {
      _id: 1,
      title: 'Title',
      url: this.state.form.link,
    }]
    if(this.state.form){

    //CHECK IF link IS renderEmpty
    if(this.props.link.length > 0){
      //CART IS NOT EMPTY
      let _id= this.props._id;
      //checks if item exist from before
      let cartIndex = this.props.link.findIndex(function(cart){
        return cart._id === _id;
      })
      //IF RETURNS -1 THERE AR ENO ITEMS ITH SAME ID
      //then we add to cart
      if(cartIndex === -1){
        this.props.addLinkToCart(item);
      } else {
        //do we need to handle this?

      }
    } else {
      //cart is empty so its safe to post the item
      this.props.addLinkToCart(item);

    }
  }
    //close Modal
    this.closeLinkModal();

  }
  // textfields
  handleTextChange(event){
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fleldVal}})
  }


  //--------Modal---------

  //opens/closes the modal
  open(){
    this.setState({showModal:true})
  }
  close(){
    this.setState({showModal: false})
  }
  openLinkModal(){
    this.setState({showLinkModal:true})
  }
  closeLinkModal(){
    this.setState({showLinkModal: false})
  }


  //----Render functions --------
  render() {
      return this.renderCart();
  }




  renderCart(){
    //renders the cartitem list from reducer
    const noteList = this.props.cart.map(function(noteArr){
      return(
        <Col xs={12} sm={12} md={12} key={noteArr._id}>
          <NoteItem
            _id={noteArr._id}
            title={noteArr.title}
            note={noteArr.note}
          />
        </Col>
      )
    })

    //renders the linkitem list from reducer

    const linkList = this.props.link.map(function(linkArr){
      return(
        <Col xs={12} sm={12} md={12} key={linkArr._id}>
          <LinkItem
            _id={linkArr._id}
            title={linkArr.title}
            url={linkArr.url}
          />
        </Col>
      )
    })

    console.log('note',this.state.form);
    //the actual rendering
    return(
      <Grid className="cart">
        <h1>{this.props.uni_name}</h1>
        <Row>
          <UnInfo
            title={'Henter ut all data fra state'}
            description={'Beskrivelse ioaosf oifsdhoubfsa nofbisdu kkbfbiusdbfi nfisidbu dfsbfi sdfibbdi iobsiufviub bsafvib'}
          />
        </Row>
        <Row>
          <Col xs={12} sm={6} className="cartItem">
            <Well style={{width: '40vw'}}>
              <h1>Notater</h1>
              {this.props.cart[0] ? (noteList):('Du har ingen notater enda')}
            </Well>
          </Col>
          <Col xs={12} sm={6} className="cartItem">
            <Well style={{width: '40vw'}}>
              <h1>Linker</h1>
              {this.props.link[0] ? (linkList):('Du har ingen notater enda')}
            </Well>
          </Col>
        </Row>
        <Row className="cartbuttons">
          <Button onClick={this.open.bind(this)} bsStyle='primary'>Legg til notat</Button>
          <Button onClick={this.openLinkModal.bind(this)} bsStyle='primary'>Legg til link</Button>
        </Row>
        {/* Note modal */}
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Legg title notat</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Notat</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Tekst..." name="note" onChange={this.handleTextChange.bind(this)}/>
            </FormGroup>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleNoteAdd.bind(this)}>Legg til</Button>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
        {/* Link modal */}
        <Modal show={this.state.showLinkModal} onHide={this.closeLinkModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Legg til link</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Link</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Tekst..."  name="link" onChange={this.handleTextChange.bind(this)}/>
            </FormGroup>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleLinkAdd.bind(this)}>Legg til</Button>
            <Button onClick={this.closeLinkModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Grid>
    )
  }
}
function mapStateToProps(state){
  return{
    link: state.cart.link,
    cart:state.cart.cart,
    uni_name: state.profile.uni_name,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteLinkItem:deleteLinkItem,
    deleteCartItem: deleteCartItem,
    addToCart: addToCart,
    updateCart: updateCart,
    addLinkToCart: addLinkToCart,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(University);
