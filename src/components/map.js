import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGEOJSON} from '../actions/mapActions';

import '../App.css';
import { Map, TileLayer, Marker, Popup, GeoJSON  } from 'react-leaflet'
import {Jumbotron, Grid, Col, Row, Button, Glyphicon} from 'react-bootstrap';
import world_countries from '../geoJson/world_countries';
import universities from '../geoJson/uni';

//Global variables
let tile_layer ='https://api.mapbox.com/styles/v1/kristogs/cjee2fy4u00jb2ro1kwgrex8w/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RvZ3MiLCJhIjoiY2pjdWlrbHhjMGt3YzJ3cW9sNm5xODc1dSJ9.Nvgmd0tPcaQWPgoUk2DISA';
let start_pos = [42.403505,48.925165];
let temp_pos = [];
let temp_zoom = 0;
let show_uni = false;
let temp_bound = [[81, 180], [41, -180]];
const outer = [[-30.005769, -100.923439], [70, 140.295311]];
let countryNameDisplayed = '';
let new_fillOpacity = 1;
let new_Opacity = 1;
var change_zoom = true;


function getColor (d) {
  return '#2a3446'

}
function style (feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: '#2a3446',
    dashArray: '1',
    fillOpacity: 0,
  };
}

// highlight on mouseOver
function highlightFeature (feature, e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.4,
    opacity:0,
  });
  // this.setState({countryDisplayed:feature.properties.name})
  countryNameDisplayed= feature.properties.name;
}

// reset default style on mouseOut
function resetHighlight (component, e) {
  component.refs.geojson.leafletElement.resetStyle(e.target);
}


function onEachFeature (component, feature, layer) {
  layer.on({
    mouseover: highlightFeature.bind(null, feature),
    mouseout: resetHighlight.bind(null, component),
    click: function(){
          if(change_zoom){
            var init_bounds = layer.getBounds();
            var center = init_bounds.getCenter();
            var name = feature.properties.name;
            resetHighlight.bind(null,component);
            highlightFeature.bind(null, feature);
            console.log('name',name);
            temp_bound = init_bounds;
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
      maxBounds: [[-180,-180],[180,180]],

    }
  }
  componentWillReceiveProps(nextProp){
    if(nextProp.geojson !== this.props.geojson){
      this._pop.forceUpdate()
      console.log('this._pop',this._pop);
    }
  }

  setBounds(){
      this.setState({
        bounds: temp_bound,
        fillColor: 1,
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
    this.props.getGEOJSON(countryNameDisplayed);

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
  }

  setUni(){
    this.setState({showUni: show_uni})
  }


/*
<TileLayer
url="https://api.mapbox.com/styles/v1/kampenes/cjckg518s27a72rnroccgk5rv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtcGVuZXMiLCJhIjoiY2pjZDkydmw0MGVlZjJxcm41Z3lienR0dSJ9.SMLNm7TAUXL9xXdoZuTiZA"
attribution="<attribution>" />
*/

  render() {
    console.log('uni:', universities);
    console.log('this.props.heosjen', this.props.geojson);
      return (
        <div className="mapbox">
          <div className="map">
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
              />

              {}


              <GeoJSON ref="geojson" data={world_countries} style={style} onEachFeature={onEachFeature.bind(null, this)}/>

              {(!this.state.showUni)?(''):(<GeoJSON ref={(c) => this._pop = c} data={this.props.geojson} style={style} onClick={this.setBounds.bind(this)} onEachFeature={onEachPopUp.bind(null,this)}/>)}
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
    geojson: state.map.geojson
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getGEOJSON: getGEOJSON,
  },dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
