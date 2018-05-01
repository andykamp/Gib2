"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {getProfileUniversity, getProfileNotesAndLinks,setInfo} from '../../actions/profileActions';
import {Link} from 'react-router';
import { BeatLoader } from 'react-spinners';

import NoteItem from '../noteItem';
import LinkItem from '../linkItem';
import University from './university';

class Cart extends React.Component{
  constructor() {
    super()
    this.state = {
      loader: true,
    }
  }
  componentWillMount(){
    // this.props.getProfileUniversity();
  }
  componentDidMount(){
    const that=this;
      setTimeout(function(){
        that.setState({loader: false});
    }, 2000);
  }

 handleClick(uni, notes, links){
   this.props.getProfileUniversity(uni)
   this.props.getProfileNotesAndLinks(notes, links)
 }



 renderEmpty(){
   return(
   <Row >
     <img src={require('../../images/files.png')} style={{width: 300, height:300}} />
     <h6 style={{textAlign: 'center'}}>Du har ikke lagt til noen universiteter enda...</h6>
   </Row>
 );
 }

 renderScreen(){
   if(this.state.loader){
     return(
       <BeatLoader
         color={'#2a3446'}
         loading={this.state.loader}

       />
     );
   }
   else {
     const universities= this.props.uni.my_universities.map(function(uniArr){
       return(

         <Col xs={12} sm={6} md={3} className="cartList">
           <Link  to="/universitet" onClick={this.handleClick.bind(this, uniArr.university, uniArr.notes, uniArr.links)} className="collegeItem" >
             <Row style={{flex: 2, width: '100%', heigth: 200, }}>
               <img src={require('../../images/placeholder.png')} style={{width:'100%', height:150}} />
             </Row>
             <Row style={{flex: 1, height: 70}}>
             <h3 >{uniArr.university.universitet}</h3>
             </Row>

           </Link>

         </Col>

       )
     },this)

     return(
       <div>
       {(!universities.length) ? (this.renderEmpty()):
         (<Row >
         {universities}
       </Row>)}
     </div>
     );
   }
 }
  render(){

    return(
      <Grid className="cart">
        <h1>Universiteter du har lagt til</h1>
        {this.renderScreen()}
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
    getProfileUniversity: getProfileUniversity,
    getProfileNotesAndLinks:getProfileNotesAndLinks,
    setInfo: setInfo,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
