import React, { Component } from 'react';
import {Tabs, Tab,ProgressBar,Grid, Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label, FormGroup, ControlLabel, FormControl, HelpBlock, Image, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getReports,getUniversities, add_favorite_university} from '../actions/mapInfoActions';
import {Link} from 'react-router';
import Animation from './animation'
import Review from './review';
import NotLoggedIn from './notLoggedIn'

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

addFavorite(email,id){
console.log("sending fav uni", email, id);
if(email.length<11){
  this.setState({showModel:true})
}
this.props.add_favorite_university(email, id)
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
    let reports = "Ingen tilgjengelige rapporter"
    if (this.props.reports !== null && this.props.reports !== undefined && this.props.reports.length >0){
      // if(this.props.report.length<1){
      //   return(
      //     "Ingen rapporter å vise"
      //   )
      // }
      reports = this.props.reports.map(function(report){
          return(
            <Review
              date={report.Rapportdato}
              thumb={report["Vil du anbefale andre å reise til studiestedet?"]}
              link={report.url}
              summary={report["Hva er begrunnelsen for anbefalingen?"]}
              stud_dir={report["Studieprogram ved NTNU:"]}
            />
          )
      }


      )
  }else{
    reports = "Ingen tilgjengelige rapporter"
  }

  console.log("RATING", this.props.uni.rating['positive']*100,this.props.uni.rating['negative']);

    return (
      <div  style={{flex: 1, width: '100%', minHeight: '90vh', color:'#2a3446'}}>
        <Row className="topSearched" style={{paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}>
          {/* <img src={require('../images/arrowDown.png')} style={{height: 20, marginTop: 5, marginBottom: 20}} /> */}
          <h2>{this.props.uni.universitet}</h2>
          <img src={require('../images/line.png')} style={{width: 300}} />
          {/* <Row className="bottomImg" style={{width: 200}}>
            <Col xs={2} sm={2} md={2} style={{width: '100%',backgroundColor: '#2a3446', height: '100%', alignItems: 'left'}}>
              <Glyphicon style = {{color:'white', margin: 0, padding: 0, fontSize:30}} glyph="glyphicon glyphicon-star-empty" />

            </Col>

            <Col xs={10} sm={10} md={10}>
              Legg til din profil
            </Col>
          </Row> */}
          <Row className="mapInfo" style={{width: '80vw'}}>

            <Col xs={12} sm={6} md={6} style={{flex:1, minHeight: '90vh', backgroundColor: 'white', margin:10, width: '50%'}}>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" style={{marginTop: 10}}>
                <Tab eventKey={1} title="Informasjon" style={{width: '100%'}}>


                  <div className="infoRowHeader">
                    <h3 style={{fontWeight: 'bold'}}>Informasjon</h3>
                  </div>

                    <div className="infoRow">
                      <img src={require('../images/marker.png')} style={{height: 20,marginBottom: 0, marginRight: 5}}/>
                      <h4>{this.props.uni.by}, {this.props.uni.land}</h4>
                    </div>

                      {/* <img src={require('../images/marker.png')} style={{height: 20,marginBottom: 0, marginRight: 5}}/> */}
                      <h4>Avstand fra ntnu:</h4>
                      <p>{ Math.round(this.props.uni.meters_from_ntnu)} meter</p>

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

                    <div className="infoColHeader">


                      <Button className="button" href="http://www.ntnu.no/studier/studier_i_utlandet/prosedyrer">
                          Hvordan søker jeg?

                        </Button>
                        <Button className="button" onClick={this.addFavorite.bind(this, this.props.mail, this.props.uni._id)}>

                            Legg til i min profil

                          </Button>
                  </div>


                  </Tab>
                  <Tab eventKey={2} title="Nyttige lenker"  style={{width: '100%'}}>
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
                  <Tab eventKey={3} title="Tips fra studenter"  style={{width: '100%'}}>
                    Se hva andres studenter anbefaler deg og gjøre for å forenkle søknadsprossessen og legg til tips du har funet nyttige
                  </Tab>
              </Tabs>
            </Col>

            <Col xs={12} sm={6} md={6} style={{flex:1, minHeight: '90vh',backgroundColor: 'white', margin:10}}>
              <div className="infoRowHeader">
                <h3 style={{fontWeight: 'bold'}}>Tidligere tilbakemeldninger</h3>
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
                <Animation anbefaler={this.props.uni.rating['negative']+2} anbefalerikke={this.props.uni.rating['positive']+2} />
              </div>

              <Row style={{height: 20}}/>

            {reports}


              <div className="infoColHeader">
                <Button className="button" href={`https://www.ntnu.no/studier/studier_i_utlandet/rapport/table.php?away_country=default&away_city=&away_university=${this.props.uni.universitet.split(',')[0]}&home_university=default&searchOldReports=yes&home_faculty=&home_institute=&exchange_program=default&exchange_period=default&number-of-views=10&advanced_search_enabled=no&language=no`} target="_blank">

                  Se alle rapporter fra dette universitetet
                </Button>
                <Button className="button" href={`https://www.ntnu.no/studier/studier_i_utlandet/rapport/table.php?away_country=default&away_city=${this.props.uni.by}&away_university=&home_university=default&searchOldReports=yes&home_faculty=&home_institute=&exchange_program=default&exchange_period=default&number-of-views=10&advanced_search_enabled=no&language=no`} target="_blank">
                  Se alle rapporter fra denne byen
                </Button>
                <Button className="button" href={`https://www.ntnu.no/studier/studier_i_utlandet/rapport/table.php?away_country=${this.props.uni.land.slice(0,3)}&away_city=&away_university=&home_university=default&searchOldReports=yes&home_faculty=&home_institute=&exchange_program=default&exchange_period=default&number-of-views=10&advanced_search_enabled=no&language=no`} target="_blank">
                  Se alle rapporter fra dette landet
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
      <div id="mapInfoId">
        {(this.props.uni.by) ? (this.renderInfo()) : ("")}
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    uni:state.university.university,
    mail:state.login.mail,
    reports: state.map.reports
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    add_favorite_university:add_favorite_university,
    getUniversities:getUniversities,
    getReports: getReports
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(mapInfo)
