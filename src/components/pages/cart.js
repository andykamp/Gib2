"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, Glyphicon, OverlayTrigger, Popover, Image} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {getProfileUniversity, getProfileNotesAndLinks,setInfo, deleteUniversity} from '../../actions/profileActions';
import {setLoginInfo}  from '../../actions/loginActions'
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
    this.props.setLoginInfo(this.props.mail);
    console.log('HAHAHAHA');
  }
  componentWillReceiveProps(){

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
 deleteUn(mail, id){
   this.props.deleteUniversity(mail, id)
 }

 renderScreen(){
   if(this.state.loader){
     return(
       <div className="centerCol" style={{height: '80vh'}}>
       <BeatLoader
         color={'#2a3446'}
         loading={this.state.loader}

       />
       Loading universities...
     </div>
     );
   }
   else {
     const popoverHoverFocus = (
     <Popover id="popover-trigger-hover-focus">
       Delete this university from your profile.
     </Popover>);
     let universities = ''
     if (this.props.uni.my_universities.length>0){


     universities= this.props.uni.my_universities.map(function(uniArr){
       return(

         <Col xs={12} sm={6} md={4} className=" cartList">
           <OverlayTrigger
               trigger={['hover', 'focus']}
               placement="bottom"
               overlay={popoverHoverFocus}
             >
            <Glyphicon id="delete" glyph="glyphicon glyphicon-remove" onClick={this.deleteUn.bind(this,this.props.mail,uniArr.university._id)}/>
          </OverlayTrigger>

            <Link  to="/universitet" onClick={this.handleClick.bind(this, uniArr.university, uniArr.notes, uniArr.links)} className="collegeItem">
             <Row className="centerRow" style={{flex: 2, width: '100%', heigth: 200, padding: 20}}>
               <Image responsive src={require('../../images/courthouse.png')} style={{ height:150}} />
             </Row>
             <Row style={{flex: 1, textAlign: 'center', color: '#2a3446', textDecorationColor: 'white', padding: 10}}>
             <h3 >{uniArr.university.universitet.split(',')[0]}</h3>
             </Row>

           </Link>

         </Col>

       )
     },this)
   }



     return(
       <div>
       {(!universities.length) ? (this.renderEmpty()):
         (<Row className="centerRowRow" >
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
        <img src={require('../../images/line.png')} style={{width: 300}} />

        {this.renderScreen()}
      </Grid>
    )
  }
}

function mapStateToProps(state){
  return{
    uni: state.profile.uni,
    mail:state.login.mail
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getProfileUniversity: getProfileUniversity,
    getProfileNotesAndLinks:getProfileNotesAndLinks,
    setInfo: setInfo,
    deleteUniversity:deleteUniversity,
    setLoginInfo: setLoginInfo,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
