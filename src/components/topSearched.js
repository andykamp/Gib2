import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTop4 } from '../actions/top4Actions';
import { getUniversities } from '../actions/mapInfoActions';
import { getGEOJSONbyID } from '../actions/mapActions';

class topSearched extends Component {

  componentWillMount() {
    this.props.getTop4();
  }

  componentDidMount() {
  }

  onTopClick(uniId) {
    this.props.getUniversities(uniId);
    this.props.getGEOJSONbyID(uniId);
  }

  render() {
    const top4 = (this.props.uni) ? this.props.uni.map(function(item) {
      return (
        <Col xs={12} sm={6} md={3} className="topSearchedCol">
          <Row style={{flex: 2 }} className="topSearched">
            <h3 style={{textAlign: 'center'}}>{item.universitet.split(',')[0]}</h3>
          </Row>
          <div className="infoRow">
            <img src={require('../images/marker.png')} style={{height: 15,marginBottom: 0, marginRight: 5}}/>
            <h5>{item.by}, {item.land}</h5>
          </div>
          <Row style={{flex: 1, height: 70}}>
            <button className='buttonSmall' onClick={this.onTopClick.bind(this, item._id)} style={{textAlign: 'center'}}>Mer info</button>
          </Row>
        </Col>
      )
    }, this) : null;
    return (
      <Grid className="topSearched">
        <h1>Top søkte universiteter</h1>
        <img alt="" src={require('../images/line.png')} style={{width: 300}} />
        <Row style={{ marginTop: 10 }}>
          {top4}
        </Row>
      </Grid>
    );
  }
}
function top4StateToProps(state) {
  return {
    uni: state.top4.uni,
  };
}
function top4DispatchToProps(dispatch) {
  return bindActionCreators({
    getTop4,
    getUniversities,
    getGEOJSONbyID,
  }, dispatch);
}
export default connect(top4StateToProps, top4DispatchToProps)(topSearched)
