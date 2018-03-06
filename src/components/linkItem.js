import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteLinkItem} from '../actions/cartActions';

class LinkItem extends React.Component{
  constructor(){
    super();
    this.state = {
      isClicked:false
    };
  }
  onReadMore(){
    this.setState({
      isClicked:true
    })
  }
  //---link functions-------

  //deletes linkitem
  onDeleteLink(_id){
    const currentCartToDelete = this.props.link
    //Determine at wich index in books array is the book to be deleted
    const indexToDelete = currentCartToDelete.findIndex(
      function(link){
        return link._id === _id
      }
    )
    //uses slice to remove the book at the specified indexToDelete
    let cartAfterDelete = [...currentCartToDelete.slice(0,indexToDelete), ...currentCartToDelete.slice(indexToDelete + 1)];
    //returns the new array to reducer
    this.props.deleteLinkItem(cartAfterDelete);
  }


  render() {
    return(
        <Row style={{width: '40vw'}}>
            <h6>{this.props.title}</h6>
            <p>{(this.props.url.length> 50 && !this.state.isClicked)?(this.props.url.substring(0,50)):(this.props.url)}
              <btton className="link" onClick={this.onReadMore.bind(this)}>
                {(!this.state.isClicked && this.props.url !== null && this.props.url.length > 50)?('...read more'):('')}
              </btton>
            </p>
            <Button onClick={this.onDeleteLink.bind(this, this.props._id)} bsStyle="danger" bsSize="small">Slett</Button>
        </Row>
    )
  }
}
function mapStateToProps(state){
  return {
    link: state.cart.link
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteLinkItem: deleteLinkItem,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LinkItem);
