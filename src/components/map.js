import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGEOJSON, getSearchResult,getGEOJSONbyID, emptySeachResult} from '../actions/mapActions';

import '../App.css';
import { Map, TileLayer, Marker, Popup, GeoJSON  } from 'react-leaflet'
import {Glyphicon,FormGroup, form, FormControl, Grid, Col, Row, Button} from 'react-bootstrap';
import world_countries from '../geoJson/world_countries';
import universities from '../geoJson/uni';
import Searchbar from './searchbar'

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

function getColor (d) {
  return '#2a3446'

}
function getOpacity(d) {
  let opacity=1
  if(d === countryNameDisplayed){
    opacity = 0
  }
  return opacity
}
function style (feature) {
  return {
    fillColor: getColor(feature.properties.name),
    weight: 2,
    opacity: 1,
    color: '#2a3446',
    dashArray: '1',
    fillOpacity: getOpacity(feature.properties.name),
  };
}

// highlight on mouseOver
function highlightFeature (feature, e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: (feature.properties.name === countryClicked)?('0'):('0.4'),
    opacity:0,
  });
  // this.setState({countryDisplayed:feature.properties.name})
  countryNameDisplayed= feature.properties.name;
}

// reset default style on mouseOut
function resetHighlight (feature, e) {
  // component.refs.geojson.leafletElement.resetStyle(e.target);
  var layer = e.target;
  layer.setStyle({
    fillColor: getColor(feature.properties.name),
    weight: 2,
    opacity: 1,
    color: '#2a3446',
    dashArray: '1',
    fillOpacity: (feature.properties.name === countryClicked)?('0'):('1')
  });
}


function onEachFeature (component, feature, layer) {
  layer.on({
    mouseover: highlightFeature.bind(null, feature),
    mouseout: resetHighlight.bind(null, feature),
    click: function(){
          if(change_zoom){
              var init_bounds = layer.getBounds();
              var name = feature.properties.name;
              var tile_layer = 'https://api.mapbox.com/styles/v1/kristogs/cjee2fy4u00jb2ro1kwgrex8w/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RvZ3MiLCJhIjoiY2pjdWlrbHhjMGt3YzJ3cW9sNm5xODc1dSJ9.Nvgmd0tPcaQWPgoUk2DISA';
              countryClicked= name;
              console.log('name',name);
              component.props.getGEOJSON(countryNameDisplayed);
              component.refs.geojson.leafletElement.clearLayers();
              component.refs.geojson.leafletElement.addData(world_countries);
              component.setState({bounds: init_bounds})
              component.setState({tile_layer_url: tile_layer})
              num_countryuni = component.props.num_uni;
              console.log('num_uni map',num_countryuni);

          };
      },
  });
}

function onEachPopUp(component, feature, layer) {
    layer.on({
    mouseover: function(){
      change_zoom = false;
//"<img style='height:15px;width:15px;margin-bottom:2px' src="+require('../images/exit.png')+"/>"+ "<br>"+    
      var content = feature.properties.universitet
      layer.bindPopup(content)
      //hvis vi vil begrense popupen
      //layer.bindPopup(content, {maxWidth: 100, maxHeight: 100})
      layer.openPopup()
    },
    mouseout: function(){
      change_zoom = true;
    },
    click: function(){
      //get coordinates of uni
      var temp_pos = feature.geometry.coordinates;

      var init_bounds = [[temp_pos[1]-0.1,temp_pos[0]-0.1],[temp_pos[1]+0.1,temp_pos[0]+0.1]];
      component.setState({bounds: init_bounds})

    }
  });
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
    }
  }
  componentWillReceiveProps(nextProp){

    if(nextProp.geojson !== this.props.geojson){
      this.refs.popjson.leafletElement.clearLayers();

        console.log('nextProp',nextProp);
      this.refs.popjson.leafletElement.addData(nextProp.geojson);

    }
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
      this.refs.popjson.leafletElement.clearLayers();
      this.refs.geojson.leafletElement.clearLayers();
      this.setState({bounds:outer})
      this.setState({showUni: false})
      this.refs.geojson.leafletElement.addData(world_countries);
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

  //Searchbar
  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log(this.state.value);
    this.search(e.target.value)
  }
  search(searched){
  this.props.getSearchResult(searched)
}
clearSearch(result, id){
  this.setState({ value: result });
  this.props.emptySeachResult();
  this.goToSearch(id)
}
goToSearch(id){
  this.props.getGEOJSONbyID(id);
  this.refs.popjson.leafletElement.addData(this.props.geojson);

}

  render() {
    let result = this.props.searchResult.features.map(function(result){
      return(
        <div className="searchItem" onClick={this.clearSearch.bind(this,result.properties.university, result._id)}>
          <Glyphicon style={{marginRight: 5}} glyph="glyphicon glyphicon-map-marker" />
          <p>{result.properties.university}</p>
        </div>


    );
    }, this)

      return (
        <div className="mapbox">
          <div className="map">

            <form className="searchbar">
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Search"
                  onChange={this.handleChange.bind(this)}
                  className="searchform"
                />
                <div  className="search-btn" onClick={this.goToSearch.bind(this)}>
                  <Glyphicon glyph="glyphicon glyphicon-search" />
                </div>
              { !this.props.searchResult.features.length?(''):(
                  <div style={{backgroundColor: 'white', borderRadius: 2, padding:2, marginTop: 2}}>
                    {result}
                  </div>
                )}

            </form>

            <Map

              id="mapid"
              zoom={this.state.zoom}
              onMoveend={this.handleMoveend}
              ref="map"
              scrollWheelZoom={false}
              bounds={this.state.bounds}
              fillOpacity = {this.state.fillOpacity}
              maxBounds = {this.state.maxBounds}
            >
              <TileLayer
                className = "tileLayer"
                url  = {this.state.tile_layer_url}
                attribution="<attribution>"
                  noWrap = {true}
                continuousWorld = {true}
                bounds={outer}
              />

              {}


              <GeoJSON ref="geojson" data={world_countries} style={style} onEachFeature={onEachFeature.bind(null, this)}/>
              <GeoJSON ref="popjson" data={this.props.geojson} style={style} onEachFeature={onEachPopUp.bind(null,this)}/>

              <a onClick={this.resetButton.bind(this)} className = "resetZoomButton" href="#" title="ResetZoom" role="button" aria-label="Reset"><Glyphicon className = "resetZoom" glyph="glyphicon glyphicon-repeat" /></a>

              <div className="infoMapDiv jumbotron" style={{opacity:1}}>
                <h3 style={{opacity:1}}>
                    {countryNameDisplayed}
                </h3>
                {(this.props.num_uni !== 0)?(
                  <h5 style={{opacity:1}}>Number of universitet: {this.props.num_uni}</h5>
                ):('')}
              </div>

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
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getGEOJSON: getGEOJSON,
    getSearchResult: getSearchResult,
    getGEOJSONbyID: getGEOJSONbyID,
    emptySeachResult:emptySeachResult,
  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
