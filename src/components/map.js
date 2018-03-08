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
let start_pos = [42.403505,48.925165];
let temp_pos = [];
let temp_zoom = 0;
let show_uni = false;
let temp_bound = [[81, 180], [41, -180]];
const outer = [[-69.005769, -172.923439], [70, 140.295311]];
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
            var center = init_bounds.getCenter();
            var name = feature.properties.name;
            countryClicked= name;
            console.log('name',name);
            temp_bound = init_bounds;
            component.props.getGEOJSON(countryNameDisplayed);

            component.refs.geojson.leafletElement.clearLayers();

            component.refs.geojson.leafletElement.addData(world_countries);

            console.log(component);
            tile_layer = 'https://api.mapbox.com/styles/v1/kristogs/cjee2fy4u00jb2ro1kwgrex8w/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RvZ3MiLCJhIjoiY2pjdWlrbHhjMGt3YzJ3cW9sNm5xODc1dSJ9.Nvgmd0tPcaQWPgoUk2DISA';

            if (!show_uni){show_uni = true};
            layer.setStyle({
              fillOpacity: 0,
              opacity: 1,
              fillColor: 'red'
            });

          };
      },
  });
}

function onEachPopUp(component, feature, layer) {
    layer.on({
    mouseover: function(){
      change_zoom = false;
      var content = "<img style='height:15px;width:15px;margin-bottom:2px' src="+require('../images/exit.png')+"/>"
                  +"<br>"+feature.properties.universitet
      layer.bindPopup(content)
      //hvis vi vil begrense popupen
      //layer.bindPopup(content, {maxWidth: 100, maxHeight: 100})
      //console.log(layer.bindPopup(feature.properties.university));
      layer.openPopup()
    },
    click: function(){
      //get coordinates of uni
      temp_pos = feature.geometry.coordinates;
      var init_bounds = [[temp_pos[1]-0.1,temp_pos[0]-0.1],[temp_pos[1]+0.1,temp_pos[0]+0.1]];
      temp_bound = init_bounds;



    }
  });
}


class MapContainer extends Component {
  constructor() {
    super()

    this.state = {
      center:start_pos,
      zoom: 0.7,
      bounds: outer,
      displayInfo: false,
      pageX:0,
      pageY:0,
      scale:1,
      countries: {},
      showUni: false,
      tile_layer_url: tile_layer,
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

  zoomToPopup(){
    this.setState({bounds:temp_bound})
  }

  _handleClick(e){
    var x = window.event.pageX;
    var y = window.event.pageY;
    this.setState({pageY: y, pageX: x});
    // this.handleShow();
    this.setBounds();
    this.setTileLayer();
    this.setUni();
  }
  handleHide() {
  this.setState({ displayInfo: false });
  }
  handleShow() {
    this.setState({ displayInfo: true });
  }

  resetButton(){
    this.setState({bounds:outer})
    this.setState({showUni: false})
    change_zoom = true;
    // this.refs.geojson.props.setStyle({
    //   fillColor: 'red',
    //   weight: 2,
    //   opacity: 1,
    //   color: '#2a3446',
    //   dashArray: '1',
    //   fillOpacity: '1'
    // });

    this.refs.popjson.leafletElement.clearLayers();
    // this.refs.geojson.leafletElement.clearLayers();
    // this.refs.geojson.leafletElement.addData(world_countries);

    tile_layer = '';
    this.setState({tile_layer_url: tile_layer})
  }

  setUni(){
    this.setState({showUni: show_uni})
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
              center={this.state.center}
              zoom={this.state.zoom}
              onMoveend={this.handleMoveend}
              ref="map"
              scrollWheelZoom={false}
              onClick={this._handleClick.bind(this)}
              bounds={this.state.bounds}
              fillOpacity = {this.state.fillOpacity}
              maxBounds = {this.state.maxBounds}
            >
              <TileLayer
                className = "tileLayer"
                url  = {tile_layer}
                attribution="<attribution>"
                  noWrap = {true}
                continuousWorld = {true}
                bounds={outer}
              />

              {}


              <GeoJSON ref="geojson" data={world_countries} style={style} onEachFeature={onEachFeature.bind(null, this)}/>

              <GeoJSON ref="popjson" data={this.props.geojson} style={style} onClick={this.setBounds.bind(this)} onEachFeature={onEachPopUp.bind(null,this)}/>
              <h2 className = "infoMapDivFont"> {countryNameDisplayed} </h2>
              <a onClick={this.resetButton.bind(this)} className = "resetZoomButton" href="#" title="ResetZoom" role="button" aria-label="Reset"><Glyphicon className = "resetZoom" glyph="glyphicon glyphicon-repeat" /></a>
              <div className="infoMapDiv jumbotron" ></div>

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
