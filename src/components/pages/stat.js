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
import { BeatLoader } from 'react-spinners';

class Stat extends Component {
  constructor() {
    super()
    this.state = {
      list: true,
      loader: true,
    }
  }

  componentWillMount(){
    this.props.get_all_choropleth()
  }
  componentDidMount(){
    const that=this;
      setTimeout(function(){
        that.setState({loader: false});
    }, 2000);
  }


  renderScreen(){
    if(this.state.loader){
      return(
        <div className="centerCol" style={{height: '100vh'}}>
        <BeatLoader
          color={'#2a3446'}
          loading={this.state.loader}

        />
        Laster inn kostnadsstatistikk...
      </div>
      );
    }
    else {
      return (
        <div className="containerMap" style={{marginTop: '10vh', minHeight :'40vh', width: '100vw'}}>
          {/* <Col className="centerCol">
            <h1>Statestikk</h1>
            <img src={require('../../images/line.png')} style={{width: 300}} />
          </Col> */}

         {/* <Row className="centerRowRow" style={{marginTop: 20}}>
          <button className={this.state.list?"buttonBlue": "buttonBlueLight"} onClick={()=> this.setState({list:true})}>
            <h3 style={{margin:10}}>Top ten Statistics</h3>
          </button>
          <button className={!this.state.list?"buttonBlue": "buttonBlueLight"} onClick={()=> this.setState({list:false})}>
            <h3 style={{margin:10}}>Choropleth map</h3>
          </button>
        </Row> */}

                      {/* <Animation anbefaler={80} anbefalerikke={20} /> */}
                <ListStat/>

        </div>
      )
    }
  }

  render() {

      return (
        <Grid className="wholescreen">
          {this.renderScreen()}
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
