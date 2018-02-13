"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {getUniversities, setInfo} from '../../actions/profileActions';
import {Link} from 'react-router';

import NoteItem from '../noteItem';
import LinkItem from '../linkItem';
import University from './university';

class Cart extends React.Component{

  componentWillMount(){
    this.props.getUniversities();
  }

 handleClick(name){
   this.props.setInfo({ prop:'uni_name', value: name})
 }




  render(){

    const universities= this.props.uni.map(function(uniArr){
      return(
        <Link  to="/universitet" onClick={this.handleClick.bind(this, uniArr.properties.name_sort)} className="collegeItem" >
          <h1>{uniArr.properties.name_sort}</h1>
        </Link>
      )
    },this)

    return(
      <Grid className="cart">
        <h1>Universiteter du har lagt til</h1>
        <Row  className="cartList">
          {universities}
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return{
    uni: state.profile.uni,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getUniversities: getUniversities,
    setInfo: setInfo,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
