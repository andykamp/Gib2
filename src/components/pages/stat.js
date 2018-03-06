import React, { Component } from 'react';
//CSS AND BOOTSTRAP
import '../../App.css';
import {Modal, Grid, Col, Row, Button} from 'react-bootstrap';
import Animation from '../animatedStats'
//IMPORT COMPOMNENTS USED IN RENDER
import Map from '../map';
import Form from '../form';
import TopSearched from '../topSearched'

class Stat extends Component {
  constructor() {
    super()
    this.state = {

    }
  }


  render() {

      return (
        <Grid className="wholescreen">
          <div className="containerMap" style={{marginTop: '10vh'}}>
              <Animation anbefaler={80} anbefalerikke={20} />
          </div>
        </Grid>
    );
  }
}

export default Stat;
