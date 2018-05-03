import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGEOJSON, getSearchResult,getGEOJSONbyID, emptySeachResult, get_all_GEOJSON} from '../actions/mapActions';
import {getUniversities} from '../actions/mapInfoActions';

import '../App.css';
import { Map, TileLayer, Popup, GeoJSON, CircleMarker, Marker} from 'react-leaflet'
import {Glyphicon,FormGroup, form, FormControl, Grid, Col, Row, Button} from 'react-bootstrap';
import world_countries from '../geoJson/world_countries';
import universities from '../geoJson/uni';
import Searchbar from './searchbar'
import L from 'leaflet';

//Global variables
let tile_layer ='';
let temp_bound = [[81, 180], [41, -180]];
const outer = [[-69.005769, -172.923439], [70, 140.295311]];
let num_countryuni = 0;
let countryNameDisplayed = '';
let countryClicked ='';
let new_fillOpacity = 1;
let new_Opacity = 1;
var change_zoom = true;


function getColor (component,p) {
    var repList= component.props.choropleth.report_rating_groups;
    var uniList= component.props.choropleth.university_rating_groups;


    if (component.state.mapType==="report_rating"){
      return p > repList[4]? '#FF3700' :
             p > repList[3]? '#FF6500' :
             p > repList[2]? '#FFA500' :
             p > repList[1]? '#FFCF76' :
                            '#FFEAC4';
    }
    else if(component.state.mapType==="university_rating"){
      return p > uniList[4]? '#FF3700' :
             p > uniList[3]? '#FF6500' :
             p > uniList[2]? '#FFA500' :
             p > uniList[1]? '#FFCF76' :
                            '#FFEAC4';
    }
    else{
      return p >= 5? '#FF3700' :
             p >= 4? '#FF6500' :
             p >= 3 ? '#FFA500' :
             p >= 2? '#FFCF76' :
                    '#FFEAC4';
    }

}

function style (component,feature) {

  return {
    fillColor: getColor(component,feature.properties[component.state.mapType]),
    weight: 2,
    opacity: 1,
    color: '#2a3446',
    dashArray: '1',
    fillOpacity: 1,
  };
}

// highlight on mouseOver
function highlightFeature (component,feature, e) {
  var layer = e.target;
  var country_name = feature.properties.name
  component.setState({
    countryCenter: layer.getCenter(),
    countryName: country_name,
  })
  var div = document.createElement("div");
  div.setAttribute("id", "popUpDiv")
  div.innerHTML = country_name + '<br>' + feature.properties[component.state.mapType]
  layer.bindPopup(div)
  layer.openPopup()

  // this.setState({countryDisplayed:feature.properties.name})
  countryNameDisplayed= feature.properties.name;
}

// reset default style on mouseOut
function resetHighlight (component,feature, e) {
  // component.refs.geojson.leafletElement.resetStyle(e.target);
  var layer = e.target;

}


function onEachFeature (component, feature, layer) {
  layer.on({
    mouseover: highlightFeature.bind(null,component, feature),
    mouseout: resetHighlight.bind(null, component, feature),
    click: function(){
          if(change_zoom){
              var init_bounds = layer.getBounds();
              // var name = feature.properties.name;
              // var tile_layer = 'https://api.mapbox.com/styles/v1/kristogs/cjee2fy4u00jb2ro1kwgrex8w/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RvZ3MiLCJhIjoiY2pjdWlrbHhjMGt3YzJ3cW9sNm5xODc1dSJ9.Nvgmd0tPcaQWPgoUk2DISA';
              // countryClicked= name;
              // console.log('name',name);
              // component.props.getGEOJSON(countryNameDisplayed);
              // component.refs.geojson.leafletElement.clearLayers();
              // component.refs.geojson.leafletElement.addData(world_countries);
              // component.setState({bounds: init_bounds})
              // component.setState({tile_layer_url: tile_layer})
              // num_countryuni = component.props.num_uni;
              // console.log('num_uni map',num_countryuni);

          };
      },
  });
}

function numberToSpan(number) {
  switch(number) {
    case 1: return <span><b>Informasjon om studentandel</b><br/><br/>Andelen av studenter i forskjellige land. Eksempel:<br/> 12% av utvekslingsstudentene på NTNU har dratt til USA ifølge antallet rapporter</span>;
    case 2: return <span><b>Informasjon om universiteter</b><br/><br/>Andelen av universitetene som NTNU har utvekslingsavtale med. Eksempel:<br/> Frankrike har 14% av universitetene som har avtale med NTNU</span>;
    case 3: return <span><b>Informasjon om det sosiale</b><br/><br/>Den sosiale kvaliteten ved de forskjellige universitetene, rangert fra 1 til 5, der 5 er best</span>;
    case 4: return <span><b>Informasjon om det akademiske</b><br/><br/>Den akademiske kvaliteten ved de forskjellige universitetene, rangert fra 1 til 5, der 5 er best</span>;
    default: return <span></span>;
  }
}

function resetButton(component, feature, layer){
    component.setState({countryName:''});
    component.setState({bounds:outer});
    component.refs.map.leafletElement.setZoom(1)
    // component.props.top3 = '';
    //component.refs.popjson.leafletElement.clearLayers();
    //component.refs.geojson.leafletElement.clearLayers();
    console.log('reset component',component);
    // component.refs.geojson.leafletElement.addData(world_countries);

}

class MapContainer extends Component {
  constructor() {
    super()

    this.state = {
      zoom: 0.7,
      bounds: outer,
      displayInfo: false,
      pageX:0,
      pageY:0,
      scale:1,
      countries: {},
      showUni: false,
      tile_layer_url: '',
      show_tileLayer: false,
      fillOpacity:1,
      maxBounds: [[-70,-180],[180,180]],
      value: '',
      mapType: "report_rating",
      showMapType: 0,
    }
  this.handleClick = this.handleClick.bind(this);
  }

  handleLeave(e) {
    if (e.target.id.includes('Stat')) {
      this.setState({showMapType:0})
    }
  }

  handleHover(e) {
    if(e.target.id=='rapStat'){
      this.setState({showMapType:1})
    }
    else if(e.target.id=='uniStat'){
      this.setState({showMapType:2})
    }
    else if(e.target.id=='sosStat'){
      this.setState({showMapType:3})
    }
    else if (e.target.id=='akaStat'){
      this.setState({showMapType:4})
    }

  }

  handleClick(e){
    if(e.target.id=='rapStat'){
        this.setState({mapType: "report_rating"})
    }
    else if(e.target.id=='uniStat'){
        this.setState({mapType: "university_rating"})
    }
    else if(e.target.id=='sosStat'){
        this.setState({mapType: "social_rating"})
    }
    else if (e.target.id=='akaStat'){
        this.setState({mapType: "academic_rating"})
    }

    this.refs.geojson.leafletElement.clearLayers();
    this.refs.geojson.leafletElement.addData(this.props.choropleth);


  }

  componentDidMount(){
    //this.props.get_all_GEOJSON()
  }
  componentWillReceiveProps(nextProp){

    // if(nextProp.geojson !== this.props.geojson){
    //   this.refs.popjson.leafletElement.clearLayers();
    //
    //     console.log('nextProp',nextProp);
    //   this.refs.popjson.leafletElement.addData(nextProp.geojson);
    //
    // }
  }

  setBounds(){
      this.setState({
        bounds: temp_bound,
      })
  }

  setTileLayer(){
    this.setState({
      tile_layer_url: tile_layer,
    })
  }

  onScale(){
    this.setState({
      scale: this.state.scale < 1 ? 1:0
    });
  }


  handleHide() {
  this.setState({ displayInfo: false });
  }
  handleShow() {
    this.setState({ displayInfo: true });
  }

  resetButton(){
      // this.refs.popjson.leafletElement.clearLayers();
      // this.refs.geojson.leafletElement.clearLayers();
      this.setState({bounds:outer})
      this.setState({showUni: false})
      // this.refs.geojson.leafletElement.addData(world_countries);
      var tile_layer = '';
      num_countryuni = 0;
      this.setState({tile_layer_url: tile_layer})
      change_zoom = true;
  }



/*
<TileLayer
url="https://api.mapbox.com/styles/v1/kampenes/cjckg518s27a72rnroccgk5rv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtcGVuZXMiLCJhIjoiY2pjZDkydmw0MGVlZjJxcm41Z3lienR0dSJ9.SMLNm7TAUXL9xXdoZuTiZA"
attribution="<attribution>" />
*/

pointToLayer = (feature, latlng) => {
  return L.circleMarker(latlng, {
    radius: 5,
    fillColor: "orange",
    color: "orange",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.5
})
}

  render() {
    var list=[];
    var name;
    if(this.state.mapType ==="report_rating"){
      list = this.props.choropleth.report_rating_groups;
      list = list.map(a => a.toFixed(2));
      name = "Studentandel"
    }
    else if(this.state.mapType ==="university_rating"){
      list = this.props.choropleth.university_rating_groups;
      list = list.map(a => a.toFixed(2));
      name = "Universiteter";
    }
    else if (this.state.mapType ==="social_rating"){
      name = "Sosialt";
      list= [0,1,2,3,4];
    }
    else{
      name = "Akademisk";
      list= [0,1,2,3,4];

    }


      return (
        <div className="mapbox">
          <div className="map">

            <Map
              id="mapid"
              zoom={this.state.zoom}
              onMoveend={this.handleMoveend}
              ref="map"
              scrollWheelZoom={false}
              bounds={this.state.bounds}
              fillOpacity = {this.state.fillOpacity}
              maxBounds = {this.state.maxBounds}
              style = {{marginTop:0}}
              >

                  <div class = 'statInfo'>
                    {(!this.state.showMapType) ? '' : (numberToSpan(this.state.showMapType))}
                  </div>

                  <div className = 'legend'>
                    <p> {name}</p>
                    <ul class = 'list-unstyled'>
                      <li><span className= 'colorBox' style = {{background:'#FFEAC4'}}></span><p> {list[0]}-{list[1]} </p> </li>
                      <li><span className= 'colorBox' style = {{background:'#FFCF76'}}></span><p> {list[1]}-{list[2]}</p> </li>
                      <li><span className= 'colorBox' style = {{background:'#FFA500'}}></span><p> {list[2]}-{list[3]}</p> </li>
                      <li><span className= 'colorBox' style = {{background:'#FF6500'}}></span><p> {list[3]}-{list[4]}</p> </li>
                      <li><span className= 'colorBox' style = {{background:'#FF3700'}}></span><p> {list[4]}-</p> </li>
                    </ul>
                  </div>

                  <div class="btn-group" style={{position: 'absolute', right:'100px', top: '10px'}}>
                    <button id ='rapStat'  onMouseLeave={this.handleLeave.bind(this)} onMouseOver={this.handleHover.bind(this)} onClick ={this.handleClick.bind(this)}>Studenter</button>
                    <button id = 'uniStat' onMouseLeave={this.handleLeave.bind(this)} onMouseOver={this.handleHover.bind(this)} onClick ={this.handleClick.bind(this)}>Universiteter </button>
                    <button id = 'sosStat' onMouseLeave={this.handleLeave.bind(this)} onMouseOver={this.handleHover.bind(this)} onClick ={this.handleClick.bind(this)}>Sosial</button>
                    <button id = 'akaStat' onMouseLeave={this.handleLeave.bind(this)} onMouseOver={this.handleHover.bind(this)} onClick ={this.handleClick.bind(this)}>Akademisk</button>
                  </div>
                  <GeoJSON ref="geojson" data={this.props.choropleth} style={style.bind(null, this)} onEachFeature={onEachFeature.bind(null, this)}/>
                  <a onClick={resetButton.bind(null,this)} className = "resetZoomButton" href="#" title="ResetZoom" role="button" aria-label="Reset"><Glyphicon className = "resetZoom" glyph="glyphicon glyphicon-repeat" /></a>
                </Map>
          </div>
        </div>
    );
  }
}
function mapStateToProps(state){
  return{
    geojson: state.map.geojson,
    searchResult: state.map.searchResult,
    uni_all: state.map.uni_all,
    choropleth: state.map.choropleth
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    get_all_GEOJSON: get_all_GEOJSON,
    getUniversities: getUniversities,
    getGEOJSON: getGEOJSON,
    getSearchResult: getSearchResult,
    getGEOJSONbyID: getGEOJSONbyID,
    emptySeachResult:emptySeachResult,
  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
