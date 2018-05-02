import React, { Component } from 'react';
//CSS AND BOOTSTRAP
import '../../App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Grid, Col, Row, Button} from 'react-bootstrap';
import Animation from '../animatedStats'
//IMPORT COMPOMNENTS USED IN RENDER
import Map from '../statMap';
import Form from '../form';
import TopSearched from '../topSearched'
import ListStat from '../animatedStats'
import {get_all_choropleth} from '../../actions/mapActions';

class Stat extends Component {
  constructor() {
    super()
    this.state = {
      list: true

    }
  }

  componentWillMount(){
    this.props.get_all_choropleth()
  }

  render() {

      return (
        <Grid className="wholescreen">
          <div className="containerMap" style={{marginTop: '10vh'}}>
            {/* <h1>Statestikk</h1>
            <img src={require('../../images/line.png')} style={{width: 300}} /> */}
          <Row className="centerRow" style={{marginTop: 20}}>
            <button className={this.state.list?"buttonBlue": "buttonBlueLight"} onClick={()=> this.setState({list:true})}>
              Top ten
            </button>
            <button className={!this.state.list?"buttonBlue": "buttonBlueLight"} onClick={()=> this.setState({list:false})}>
              Dynamic map
            </button>
          </Row>

                        {/* <Animation anbefaler={80} anbefalerikke={20} /> */}
              {(this.state.list)?(<ListStat/>):(<Map/>)}
          </div>
        </Grid>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    get_all_choropleth: get_all_choropleth,
  },dispatch)
}
export default connect(null, mapDispatchToProps)(Stat)
