import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getGEOJSON} from '../actions/mapActions';

import '../App.css';
import { Map, TileLayer, Marker, Popup, GeoJSON  } from 'react-leaflet'
import {Jumbotron, Grid, Col, Row, Button} from 'react-bootstrap';
import world_countries from '../geoJson/world_countries';
import MapInfo from './mapInfo';

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
    fillOpacity: 1,
    padding: 50
  };
}

// highlight on mouseOver
function highlightFeature (feature, e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });
  // this.setState({countryDisplayed:feature.properties.name})
  countryNameDisplayed= feature.properties.name;
}

// reset default style on mouseOut
function resetHighlight (component, e) {
  component.refs.geojson.leafletElement.resetStyle(e.target);

}

function zoomToFeature (feature,e) {
  // map.fitBounds(e.target.getBounds());
  // how to encapsulate Map component/object?
  var layer = e.target;
  console.log(layer.getBounds());//får ut bounds
  layer.bindPopup(feature.properties.name).openPopup();
  // layer.setStyle({
  //   weight: 5,
  //   dashArray: '',
  //   fillOpacity: 0
  // });
}

function onEachFeature (component, feature, layer) {
  layer.on({
    mouseover: highlightFeature.bind(null, feature),
    mouseout: resetHighlight.bind(null, component),
    click: function(){
        console.log(  layer.setStyle({
            fillColor: 'red',
          }))
        var init_bounds = layer.getBounds();
        console.log('center',init_bounds.getCenter());
        var name = feature.properties.name;
        console.log('name',name);
        temp_bound = init_bounds;

      },
  });
}

let temp_bound = [[81, 180], [41, -180]];
let outer = [[-50, 90], [90, -90]];
let countryNameDisplayed = '';

class MapContainer extends Component {
  constructor() {
    super()

    this.state = {
      lat: 42.403505,
      lng: 48.925165,
      zoom: 0.7,
      bounds: outer,
      displayInfo: false,
      pageX:0,
      pageY:0,
      scale:1,
      countries: {},
    }
  }

  setBounds(){
      //var target_bound = [[init_bounds._southWest.lat,init_bounds._southWest.lng],[init_bounds._northEast.lat,init_bounds._northEast.lng]];
      //console.log('bounds',target_bound);
      this.setState({
        bounds: temp_bound,
        boundsOptions: {padding: [50,50]}

      })
      console.log('settes',this.state.bounds);
  }

  onScale(){
    this.setState({
      scale: this.state.scale < 1 ? 1:0
    });
  }

  _handleClick(e){
    var x = window.event.pageX;
    var y = window.event.pageY
    this.setState({pageY: y, pageX: x});
    // this.handleShow();
    this.setBounds();

  }
  handleHide() {
  this.setState({ displayInfo: false });
  }
  handleShow() {
    this.setState({ displayInfo: true });
  }

  renderInfo(){
    if(this.state.displayInfo){
      let origin = ''+this.state.pageX+'px '+this.state.pageY+'px';
      // var colorTable = document.getElementById("mapid");
      // var tOLeft = colorTable.offsetTop;
      // console.log(tOLeft);
      return(
        <div className="infoContainerBackground" style={{  animation: 'scaleInfo 300ms ease-in forwards', transformOrigin: origin,}}>
          <Row className="infoContainer" >
            <Row style={{height: 30, margin: 5}}>
              <img src={require('../images/exit.png')} style={{height: 30 }} onClick={this.handleHide.bind(this)}/>
            </Row>
          <MapInfo/>
        </Row>
        </div>
      );
    }
  }

//     highlightFeature(e) {
//       var layer = e.target;
//       console.log(layer);
//       layer.setStyle({
//           weight: 5,
//           color: '#666',
//           dashArray: '',
//           fillOpacity: 0.7
//       });
//       layer.bringToFront();
//     }
//     onEachFeature(feature, layer) {
//     if (feature.properties.name) {
//         layer.bindPopup(feature.properties.name);
//     }
// }

/*
<TileLayer
url="https://api.mapbox.com/styles/v1/kampenes/cjckg518s27a72rnroccgk5rv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtcGVuZXMiLCJhIjoiY2pjZDkydmw0MGVlZjJxcm41Z3lienR0dSJ9.SMLNm7TAUXL9xXdoZuTiZA"
attribution="<attribution>" />
*/

  render() {
    const position = [this.state.lat, this.state.lng];
      return (
        <div className="mapbox">
          <div className="map">
            <Map
              id="mapid"
              center={position}
              zoom={this.state.zoom}
              onMoveend={this.handleMoveend}
              ref="map"
              scrollWheelZoom={false}
              onClick={this._handleClick.bind(this)}
              bounds={this.state.bounds}
            >

              {/* <Marker position={position}>
                <Popup>
                  <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                </Popup>
              </Marker> */}


              <GeoJSON ref="geojson" data={world_countries} style={style} onEachFeature={onEachFeature.bind(null, this)}/>
              <div className="infoMapDiv"> Land </div>

            </Map>
          </div>

          {this.renderInfo()}
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
