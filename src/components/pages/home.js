import React, { Component } from 'react';
//CSS AND BOOTSTRAP
import '../../App.css';
import {Modal, Grid, Col, Row, Button} from 'react-bootstrap';

//IMPORT COMPOMNENTS USED IN RENDER
import Map from '../map';
import Form from '../form';
import TopSearched from '../topSearched'
import MapInfo from '../mapInfo'

class Home extends Component {
  constructor() {
    super()
    this.state = {

    }
  }


  render() {

      return (
        <Grid className="wholescreen">
          <div className="containerMap">
            <Map />
          </div>
            <MapInfo/>
            <TopSearched />
            {/* <Form /> */}
        </Grid>
    );
  }
}

export default Home;
