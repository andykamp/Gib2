import React, { Component } from 'react';
import {Tabs, Tab,ProgressBar,Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUniversities, add_favorite_university} from '../actions/mapInfoActions';
import {Link} from 'react-router';
import Animation from './animation'
import Review from './review';

class mapInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: '',
      showModal: false,
      form:'',
    };
  }

componentWillMount(){
  // this.props.getUniversities('get_university_by_id/5a59f09098c056e100406abc');
}

//--------Modal---------

//opens/closes the modal
open(){
  this.setState({showModal:true})
}
close(){
  this.setState({showModal: false})
}

addFavorite(){
this.props.add_favorite_university()
}


  renderInfo(){
    // const array1 = ['link', 'link', 'link', 'link'];
    const thumbsUp = 60;
    const thumbsDown = 40;
    // const links = this.props.uni["Mer informasjon på Innsida"].map(function(link){
    //   return(
    //     <Link>
    //       <div className="infoRow">
    //         <h6>-</h6>
    //         {link}
    //       </div>
    //     </Link>
    //   )
    // })
    return (
      <div style={{flex: 1, width: '100%', minHeight: '90vh', color:'#2a3446'}}>
        <Row className="topSearched" style={{paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}>
          {/* <img src={require('../images/arrowDown.png')} style={{height: 20, marginTop: 5, marginBottom: 20}} /> */}
          <h2 onClick={this.addFavorite.bind(this, this.props.login, this.props.uni._id)}>{this.props.uni.universitet}</h2>
          <img src={require('../images/line.png')} style={{width: 300}} />

          <Row className="mapInfo">

            <Col xs={12} sm={6} md={6} style={{flex:1, minHeight: '90vh', backgroundColor: 'white', margin:10}}>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" style={{marginTop: 10}}>
                <Tab eventKey={1} title="Informasjon">


                  <div className="infoRowHeader">
                    <h3>Informasjon</h3>
                  </div>

                    <div className="infoRow">
                      <img src={require('../images/marker.png')} style={{height: 20,marginBottom: 0, marginRight: 5}}/>
                      <h4>{this.props.uni.by}, {this.props.uni.land}</h4>
                    </div>

                    <h4>Hvem kan søke?</h4>
                    <p>{this.props.uni["Hvem kan søke"]}</p>

                    <h4>Fagområde </h4>
                    <p>{this.props.uni.Fagområde}</p>

                    <h4>Søknadsformaliteter</h4>
                    <p>
                      {this.props.uni.Søknadsformaliteter.text + ":\n"}
                      {this.props.uni.Søknadsformaliteter.url}

                    </p>
                    <h4>Avtaletype </h4>
                    <p>{this.props.uni.Avtaletype}</p>

                    <div className="infoRowHeader">
                    <Button style={{margin: 20, color: 'white', backgroundColor:'#2a3446' }}>
                        <a href="http://www.ntnu.no/studier/studier_i_utlandet/prosedyrer" style={{color: 'white'}} target="_blank">
                          Hvordan søker jeg?
                        </a>
                        </Button>
                  </div>

                  </Tab>
                  <Tab eventKey={2} title="Lenker til lærestedet">
                    <div className="infoRow">
                      {/* <img src={require('../images/link.png')} style={{height: 20,marginBottom: 0, marginRight: 5}}/> */}
                      <h4>Lenker til lærestedet</h4>

                    </div>
                        <div className="infoCol" style={{width:'100%'}}>

                          <h5><a href={this.props.uni["Lenker til lærestedet"]["Søknadsside lærested"]} target="_blank">Søknadsside lærested</a></h5>
                          <h5><a href={this.props.uni["Lenker til lærestedet"]["Akademisk kalender"]} target="_blank">Akademisk kalender</a></h5>
                          <h5><a href={this.props.uni["Lenker til lærestedet"].Bolig} target="_blank">Bolig</a></h5>
                          <h5><a href={this.props.uni["Lenker til lærestedet"]["Emner/fag ved studiestedet"]} target="_blank">Emner/fag ved studiestedet</a></h5>
                          <h5><a href={this.props.uni["Lenker til lærestedet"]["Internasjonalt kontor"]} target="_blank">Internasjonalt kontor</a></h5>
                          <h5><a href={this.props.uni["Lenker til lærestedet"]["Språkkurs"]} target="_blank">Språkkurs</a></h5>
                        </div>
                    <div className="infoRow">
                      {/* <img src={require('../images/link.png')} style={{height: 20,marginBottom: 0, marginRight: 5}}/> */}
                      <h4>Mer informasjon på Innsida</h4>
                    </div>
                        <div className="infoCol">
                          <h5><a href={this.props.uni["Mer informasjon på Innsida"].Finansiering} target="_blank">Finansiering</a></h5>
                          <h5><a href={this.props.uni["Mer informasjon på Innsida"].Kontaktinfo} target="_blank">Kontaktinfo</a></h5>
                          <h5><a href={this.props.uni["Mer informasjon på Innsida"].Søknadsprosedyrer} target="_blank">Søknadsprosedyrer</a></h5>
                          <h5><a href={this.props.uni["Mer informasjon på Innsida"]['Temaside for utenlandsstudier']} target="_blank">Temaside for utenlandsstudier</a></h5>

                        </div>
                  </Tab>
                  <Tab eventKey={3} title="Tips fra studenter" >
                    Se hva andres studenter anbefaler deg og gjøre for å forenkle søknadsprossessen og legg til tips du har funet nyttige
                  </Tab>
              </Tabs>
            </Col>

            <Col xs={12} sm={6} md={6} style={{flex:1, minHeight: '90vh',backgroundColor: 'white', margin:10}}>
              <div className="infoRowHeader">
                <h3>Tidligere tilbakemeldninger</h3>
              </div>

              <div className="infoRowHeader">
                <p>10 stk har gitt tilbakemelding på dette universitetet</p>
              </div>

              {/* <div className="infoRow">
                <h4 style={{width: '30%'}}>Anbefaler</h4>
                <ProgressBar bsStyle="success" now={thumbsUp} label={`${thumbsUp}%`}  style={{width: '70%', marginBottom: 0}}/>
              </div>

              <div className="infoRow">
                <h4 style={{width: '30%'}}>Anbefaler ikke</h4>
                <ProgressBar bsStyle="danger" now={thumbsDown} label={`${thumbsDown}%`}  style={{width: '70%', marginBottom: 0}}/>
              </div> */}
              <div className="infoRowHeader">
                <Animation anbefaler={80} anbefalerikke={20} />
              </div>

              <Row style={{height: 20}}/>

              <Review/>
              <Review/>
              <Review/>


              <div className="infoRowHeader">
                <Button style={{margin: 20, color: 'white', backgroundColor:'#2a3446' }}>
                  Se alle
                </Button>
              </div>


              </Col>
          </Row>
        </Row>

      </div>
    );
  }

  render() {

    return (
      <div id="mapInfo">
        {(this.props.uni.by) ? (this.renderInfo()) : ("")}
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    uni:state.university.university,
    login:state.login.mail
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    add_favorite_university:add_favorite_university,
    getUniversities:getUniversities
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(mapInfo)
