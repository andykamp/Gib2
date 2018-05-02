"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, addToCart, updateCart, addLinkToCart} from '../../actions/cartActions';

import NoteItem from '../noteItem';
import LinkItem from '../linkItem';
import MapInfo from '../mapInfo';

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
  let max_id = 0
  const id = this.props.cart.map(
    function(item){
      if (parseInt(item[0]) > max_id){
          max_id = parseInt(item[0])
      }

    }
  )
  const note = [(this.props.cart.length>0)?(max_id+1):(0),{
    head: 'Note',
    note: this.state.form.note,
  }]
  const item = [...this.props.cart, note ]
  if(this.state.form){
      //cart is empty so its safe to post the item
      this.props.addToCart(note, item, this.props.mail, this.props.uni._id);


  }
  //close modal
  this.close();
}
//-----link funcitons
  //handle link adding to cart
  handleLinkAdd(){
    let max_id = 0
    const id = this.props.link.map(
      function(item){
        if (parseInt(item[0]) > max_id){
            max_id = parseInt(item[0])
        }

      }
    )
    const link = [(this.props.link.length>0)?(max_id+1):(0),{
      head: 'Link',
      link: this.state.form.link,
    }]
    const item = [...this.props.link, link ]
    if(this.state.form){
        //cart is empty so its safe to post the item
        this.props.addLinkToCart(link, item, this.props.mail, this.props.uni._id);


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
        <Col xs={12} sm={12} md={12} key={noteArr[0]}>
          <NoteItem
            _id={noteArr[0]}
            title={noteArr[1]['head']}
            note={noteArr[1]['note']}
          />
        </Col>
      )
    })

    //renders the linkitem list from reducer

    const linkList = this.props.link.map(function(linkArr){
      return(
        <Col xs={12} sm={12} md={12} key={linkArr[0]}>
          <LinkItem
            _id={linkArr[0]}
            title={linkArr[1]['head']}
            url={linkArr[1]['link']}
          />
        </Col>
      )
    })

    console.log('note',this.state.form);
    //the actual rendering
    return(
      <Grid className="cart">
        <Row>
          <MapInfo />
        </Row>
        <Row className="topSearched" style={{paddingLeft: 50, paddingRight: 50 }}>


          <Row className="mapInfo" style={{width: '80vw'}}>
          <Col xs={12} sm={6} className="cartItem" style={{flex:1, backgroundColor: 'white', margin:10, width: '50%', paddingBottom: 20}}>
              <h1>Notater</h1>
              {this.props.cart[0] ? (noteList):('Du har ingen notater enda')}

            <Button className="buttonSmall" onClick={this.open.bind(this)} >Legg til notat</Button>
          </Col>
          <Col xs={12} sm={6} className="cartItem" style={{flex:1, backgroundColor: 'white', margin:10, width: '50%',  paddingBottom: 20}}>
              <h1>Linker</h1>
              {this.props.link[0] ? (linkList):('Du har ingen notater enda')}
            <Button  className="buttonSmall"  onClick={this.openLinkModal.bind(this)}>Legg til link</Button>

          </Col>
        </Row>
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
    link: state.profile.links,
    cart:state.profile.notes,
    uni: state.university.university,
    mail: state.login.mail,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({

    deleteCartItem: deleteCartItem,
    addToCart: addToCart,
    updateCart: updateCart,
    addLinkToCart: addLinkToCart,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(University);
