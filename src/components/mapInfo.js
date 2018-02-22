import React, { Component } from 'react';
import {Tabs, Tab,ProgressBar,Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUniversities} from '../actions/mapInfoActions';
import {Link} from 'react-router';

class mapInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: ''
    };
  }

componentWillMount(){
  this.props.getUniversities('get_university_by_id/5a59f09098c056e100406abc');
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
          <h2>San Diego State University, California State University</h2>
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
                      Hvordan søker jeg?
                    </Button>
                  </div>

                  </Tab>
                  <Tab eventKey={2} title="Lenker til lærestedet">
                    <div className="infoRow">
                      {/* <img src={require('../images/link.png')} style={{height: 20,marginBottom: 0, marginRight: 5}}/> */}
                      <h4>Lenker til lærestedet</h4>

                    </div>
                        <div className="infoCol">
                          <h5>Finansiering:  {this.props.uni["Mer informasjon på Innsida"].Finansiering}</h5>
                          <h5>Kontaktinfo:  {this.props.uni["Mer informasjon på Innsida"].Kontaktinfo}</h5>
                          <h5>Søknadsprosedyrer:  {this.props.uni["Mer informasjon på Innsida"].Søknadsprosedyrer}</h5>
                          <h5>Temaside for utenlandsstudier:  {this.props.uni["Mer informasjon på Innsida"]['Temaside for utenlandsstudier']}</h5>

                        </div>
                    <div className="infoRow">
                      {/* <img src={require('../images/link.png')} style={{height: 20,marginBottom: 0, marginRight: 5}}/> */}
                      <h4>Mer informasjon på Innsida</h4>
                    </div>
                        <div className="infoCol">

                          <h5>Søknadsside lærested:  {this.props.uni["Lenker til lærestedet"]["Søknadsside lærested"]}</h5>
                          <h5>Akademisk kalender:  {this.props.uni["Lenker til lærestedet"]["Akademisk kalender"]}</h5>
                          <h5>Bolig:  {this.props.uni["Lenker til lærestedet"].Bolig}</h5>
                          <h5>Emner/fag ved studiestedet:  {this.props.uni["Lenker til lærestedet"]["Emner/fag ved studiestedet"]}</h5>
                          <h5>Internasjonalt kontor:  {this.props.uni["Lenker til lærestedet"]["Internasjonalt kontor"]}</h5>
                          <h5>Språkkurs:  {this.props.uni["Lenker til lærestedet"]["Språkkurs"]}</h5>
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
                <h4>10 stk har gitt tilbakemelding på dette universitetet</h4>
              </div>

              <div className="infoRow">
                <h4 style={{width: '30%'}}>Anbefaler</h4>
                <ProgressBar bsStyle="success" now={thumbsUp} label={`${thumbsUp}%`}  style={{width: '70%', marginBottom: 0}}/>
              </div>

              <div className="infoRow">
                <h4 style={{width: '30%'}}>Anbefaler ikke</h4>
                <ProgressBar bsStyle="danger" now={thumbsDown} label={`${thumbsDown}%`}  style={{width: '70%', marginBottom: 0}}/>
              </div>

              <Row style={{height: 20}}/>
              <div className="infoRow">
                <img src={require('../images/profil.png')} style={{height: 60,marginBottom: 0, marginRight: 5}}/>
                <div className="infoCol">
                  <div className="infoRow">
                    <h6 style={{marginRight: 5}}>MTING</h6>
                    <h6>18.02.2017</h6>
                  </div>
                  <p>"Godt universitet med gode forelesninger og godt studiemiljø for utenlandske studenter. Mye interessante fag."</p>
                </div>
              </div>

              <div className="infoRow">
                <img src={require('../images/profil.png')} style={{height: 60,marginBottom: 0, marginRight: 5}}/>
                <div className="infoCol">
                  <div className="infoRow">
                    <h6 style={{marginRight: 5}}>MTING</h6>
                    <h6>18.02.2017</h6>
                  </div>
                  <p>"Godt universitet med gode forelesninger og godt studiemiljø for utenlandske studenter. Mye interessante fag."</p>
                </div>
              </div>

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
    console.log("jfdsgkjfsnlajrkgdblrnsei", this.props.uni.by);

    return (
      <div>
        {(this.props.uni.by) ? (this.renderInfo()) : ("")}
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    uni:state.university.university,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getUniversities:getUniversities
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(mapInfo)
