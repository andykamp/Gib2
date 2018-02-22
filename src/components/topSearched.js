import React, { Component } from 'react';
import {Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUniversities} from '../actions/profileActions';
import {Link} from 'react-router';

class topSearched extends React.Component {

  renderEmpty(){
    return(
    <Row >
      <img src={require('../images/files.png')} style={{width: 300, height:300}} />
    </Row>
  );
  }
  render() {

    // topSearched = []
    // topSearched[topSearched.length]  = this.props.uni[0];
    // topSearched[topSearched.length]  = this.props.uni[1];
    // topSearched[topSearched.length]  = this.props.uni[2];
    // topSearched[topSearched.length]  = this.props.uni[3];
    // console.log(topSearched);
    // const universities = topSearched.map(function(uniArr){
    //   return(
    //
    //     <Col xs={12} sm={6} md={3}>
    //       <Link className="collegeItem" >
    //         <Row style={{flex: 2, width: '100%', heigth: 200, }}>
    //           <h3 >{uniArr.land}</h3>
    //         </Row>
    //         <Row style={{flex: 1, height: 70}}>
    //         <h3 >Mer info</h3>
    //         </Row>
    //       </Link>
    //     </Col>
    //   )
    // },this)
    return (
      <Grid className="topSearched">
        <h1>Top søkte universiteter</h1>
        <img src={require('../images/line.png')} style={{width: 300}} />
        <Row style={{marginTop: 10}}>
          <Col xs={12} sm={6} md={3} className="topSearchedCol">
              <Row style={{flex: 2 }} className="topSearched">
                <h3 style={{textAlign: 'center'}}>Universitetsnavn</h3>
              </Row>

              <Row style={{flex: 1, height: 70}}>
              <h3 style={{textAlign: 'center'}}>Mer info</h3>
              </Row>
          </Col>

          <Col xs={12} sm={6} md={3} className="topSearchedCol">
              <Row style={{flex: 2 }} className="topSearched">
                <h3 style={{textAlign: 'center'}}>Universitetsnavn</h3>
              </Row>

              <Row style={{flex: 1, height: 70}}>
              <h3 style={{textAlign: 'center'}}>Mer info</h3>
              </Row>
          </Col>

          <Col xs={12} sm={6} md={3} className="topSearchedCol">
              <Row style={{flex: 2 }} className="topSearched">
                <h3 style={{textAlign: 'center'}}>Universitetsnavn</h3>
              </Row>

              <Row style={{flex: 1, height: 70}}>
              <h3 style={{textAlign: 'center'}}>Mer info</h3>
              </Row>
          </Col>

          <Col xs={12} sm={6} md={3} className="topSearchedCol">
              <Row style={{flex: 2 }} className="topSearched">
                <h3 style={{textAlign: 'center'}}>Universitetsnavn</h3>
              </Row>

              <Row style={{flex: 1, height: 70}}>
              <h3 style={{textAlign: 'center'}}>Mer info</h3>
              </Row>
          </Col>

        </Row>
      </Grid>
    );
  }
}
function mapStateToProps(state){
  return {
    uni: state.profile.uni,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getUniversities: getUniversities,

  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(topSearched)
