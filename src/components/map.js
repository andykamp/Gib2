import React, { Component } from 'react';
import keydown from 'react-keydown';
import KeyHandler, {KEYPRESS, KEYDOWN, KEYUP} from 'react-key-handler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import {getGEOJSON, getSearchResult,getGEOJSONbyID, emptySeachResult, get_all_GEOJSON} from '../actions/mapActions';
import {getUniversities} from '../actions/mapInfoActions';

import '../App.css';
import { Map, TileLayer, Popup, GeoJSON, CircleMarker, Marker} from 'react-leaflet'
import {Glyphicon,FormGroup, form, FormControl, Grid, Col, Row, Button} from 'react-bootstrap';
import world_countries from '../geoJson/world_countries';
import universities from '../geoJson/uni';
import Searchbar from './searchbar'

import orangeMarker from '../images/map_marker-orange.png'

import L from 'leaflet';

//Global variables
const outer = [[-65, -163], [85, 175]];

function getColor (d) {
  return '#2a3446'

}
function getOpacity(d, component) {
  let opacity=0.8;
  if(d === component.state.countryName){
    opacity = 0;
  }
  return opacity
}
function style (component,feature) {
  return {
    fillColor: getColor(feature.properties.name),
    weight: 2,
    opacity: 0.8,
    color: '#2a3446',
    dashArray: '1',
    fillOpacity: getOpacity(feature.properties.name, component),
  };
}

// highlight on mouseOver
function highlightFeature (component, feature, e) {
  var layer = e.target;

  layer.setStyle({
    weight: 2,
    color: '#2a3446',
    dashArray: '',
    fillOpacity: (feature.properties.name === component.state.countryName)?('0'):('0.4'),
    opacity:0.8,
  });
  // this.setState({countryDisplayed:feature.properties.name})
}

// reset default style on mouseOut
function resetHighlight (component, feature, e) {
  // component.refs.geojson.leafletElement.resetStyle(e.target);
  var layer = e.target;
  layer.setStyle({
    fillColor: getColor(feature.properties.name, component),
    weight: 2,
    opacity: 0.8,
    color: '#2a3446',
    dashArray: '1',
    fillOpacity: (feature.properties.name === component.state.countryName)?('0'):('0.8')
  });
}


function onEachFeature (component, feature, layer) {
  layer.on({
    mouseover: highlightFeature.bind(null, component,feature),
    mouseout: resetHighlight.bind(null, component,feature),
    click: function(){
          console.log('comp',component);
          // console.log(layer);
          var init_bounds = layer.getBounds();
          var name = feature.properties.name;
          var tile_layer = 'https://api.mapbox.com/styles/v1/kristogs/cjee2fy4u00jb2ro1kwgrex8w/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RvZ3MiLCJhIjoiY2pjdWlrbHhjMGt3YzJ3cW9sNm5xODc1dSJ9.Nvgmd0tPcaQWPgoUk2DISA';
          // var tile_layer = 'mapbox://styles/mapbox/streets-v9';
          component.setState({countryName: name})
          console.log('name',name);
          component.refs.geojson.leafletElement.clearLayers();
          component.refs.geojson.leafletElement.addData(world_countries);
          component.setState({bounds: init_bounds})
          component.setState({country_clicked: true})
          component.props.getGEOJSON(component.state.countryName);
      },
  });
}

function onEachPopUp(component, feature, layer) {
    layer.on({
    mouseover: function(){

      var content = feature.properties.universitet
      layer.bindPopup(content)
      layer.openPopup()
    },
    click: function(){
      //get coordinates of uni
      var temp_pos = feature.geometry.coordinates;
      var init_bounds = [[temp_pos[1]-0.1,temp_pos[0]-0.1],[temp_pos[1]+0.1,temp_pos[0]+0.1]];
      component.setState({custom_marker_pos: temp_pos})
      component.setState({bounds: init_bounds})
      component.refs.popjson.leafletElement.clearLayers();
      component.refs.popjson.leafletElement.addData(component.props.geojson);
      // component.props.getUniversities(feature.properties._id)

    }
  });
}

function resetButton(component, feature, layer){
    // component.setState({zoom: 1})
    component.setState({countryName:''});
    component.setState({bounds:outer});
    component.setState({custom_marker_pos:[]})
    component.refs.map.leafletElement.setZoom(1)
    component.clearSearch.bind(this)
    component.refs.popjson.leafletElement.clearLayers();
    component.refs.geojson.leafletElement.clearLayers();
    console.log('reset component',component);
    component.refs.geojson.leafletElement.addData(world_countries);

}

function zDown(component, e){
  if(!component.state.scrollWheelZoom){
    component.setState({scrollWheelZoom: true})
    console.log('down',component.state.scrollWheelZoom);
    console.log('down',component);
  }
}
function zUp(component, e){
  component.setState({scrollWheelZoom: false});
  console.log('up',component.state.scrollWheelZoom);
  console.log('up',component);
}


// Ray Casting algorithm            https://github.com/substack/point-in-polygon/blob/master/index.js
function isMarkerInsidePolygon(marker, poly) {
    var polyPoints = poly;
    var x = marker[1], y = marker[0];
    var inside = false;

    if (polyPoints.length==1) {
      polyPoints = polyPoints[0]
      for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
          // console.log(i);
          var xi = polyPoints[i][1], yi = polyPoints[i][0];
          var xj = polyPoints[j][1], yj = polyPoints[j][0];

          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
    }else{
      for (var k = 0; k < polyPoints.length; k++) {
        var kPolyPoints = polyPoints[k][0]
          for (var i = 0, j = kPolyPoints.length - 1; i < kPolyPoints.length; j = i++) {
              var xi = kPolyPoints[i][1], yi = kPolyPoints[i][0];
              var xj = kPolyPoints[j][1], yj = kPolyPoints[j][0];

              var intersect = ((yi > y) != (yj > y))
                  && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
              if (intersect) inside = !inside;
          }
        }
      }

    return inside;
};

function createAndSendMarkerCluster(component, nextProp){
  var country_feat = nextProp.geojson.features;

  var uni=''
  var coords = []
  for (var i = 0; i < country_feat.length; i++){
    uni = country_feat[i].properties.universitet;
    coords = country_feat[i].geometry.coordinates;
    console.log(uni, coords);
    var element = document.createElement('p')
    element.innerHTML = '<Marker position={coords}/>'
    console.log(element.innerHTML);
    // document.getElementById('cluster').appendChild(element)
  }

}

// function clusterMarkers(){
//   var countryMarkers = [[8,13],[10,12],[11,12], [12,12]]
//   var mcg = L.markerClusterGroup();
//
//   for (var i = 0; i < countryMarkers.length; i++) {
//     var a = countryMarkers[i];
//     var marker = L.marker(new L.LatLng(a[0], a[1]));
//   }
// }


class MapContainer extends Component {
  constructor() {
    super()

    this.state = {
      zoom: 1,
      bounds: outer,
      custom_marker_pos: [],
      uni_name:'',
      scale:1,
      tile_layer_url: 'https://api.mapbox.com/styles/v1/kristogs/cjee2fy4u00jb2ro1kwgrex8w/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RvZ3MiLCJhIjoiY2pjdWlrbHhjMGt3YzJ3cW9sNm5xODc1dSJ9.Nvgmd0tPcaQWPgoUk2DISA',
      show_tileLayer: false,
      fillOpacity:1,
      maxBounds: [[-70,-180],[90,180]],
      value: '',
      scrollWheelZoom: false,
      countryName: '',
      searched:false,
      showSearchedMarker:false,
      country_clicked:false,
    }
  }
  componentDidMount(){
    this.props.get_all_GEOJSON()
  }
  componentWillReceiveProps(nextProp){

    if(nextProp.geojson !== this.props.geojson){
      this.refs.popjson.leafletElement.clearLayers();

      console.log('nextProp',nextProp);
      this.refs.popjson.leafletElement.addData(nextProp.geojson);

      if (this.state.country_clicked){
        createAndSendMarkerCluster(this,nextProp)
      }


      // is inside polygon when clicked in the searchbar
      console.log('readytosearch',this.state.searched);
      if(this.state.searched){
        var inside = false;
        var country_name = '';
        var uni_names = nextProp.geojson.features[0].properties.universitet;
        var uni_coords = nextProp.geojson.features[0].geometry.coordinates;
        var country_polygon = [];
        for(var i=0; i<world_countries.features.length;i++){
            inside = isMarkerInsidePolygon(uni_coords,world_countries.features[i].geometry.coordinates);
            if(inside){
              country_polygon = world_countries.features[i].geometry.coordinates;
              country_name = world_countries.features[i].properties.name;
              this.props.getGEOJSON(country_name)
              break;
            }
        }
        if (this.state.countryName != country_name){
          this.setState({bounds: outer})
        }
        this.setState({uni_names:uni_names})
        this.setState({countryName: country_name})
        this.setState({searched:false})
        this.setState({custom_marker_pos: uni_coords})
        // console.log(this.refs.map.leafletElement.getBounds());

      }
        //Print top uni for a country
        var top3_uni = []
        var top3_coord = []
        for (var i = 0; i<nextProp.top3.length; i++){
          top3_uni.push(nextProp.top3[i].properties.universitet)
          top3_coord.push(nextProp.top3[i].geometry.coordinates)
        }
        if(nextProp.top3.length !== 0){
          document.getElementById('country_displayed').innerHTML = this.state.countryName;
          document.getElementById('top3uni').innerHTML = '';
          for (var i = 0; i < top3_uni.length; i++) {
            var init_bounds = [[top3_coord[i][1]-0.1,top3_coord[i][0]-0.1],[top3_coord[i][1]+0.1,top3_coord[i][0]+0.1]];
            var element = document.createElement('a')
            element.className = 'uni'
            element.uni = top3_uni[i]
            element.bounds = init_bounds;
            element.innerHTML = i+1+'. '+element.uni+'<br>'

            var component = this;
            element.onclick = function(){
              component.setState({bounds:this.bounds})
            }
            document.getElementById('top3uni').appendChild(element)
          }
        }else{
          document.getElementById('country_displayed').innerHTML = this.state.countryName;
          document.getElementById('top3uni').innerHTML = '';
          var element = document.createElement('h5');
          element.className = 'uni';
          element.innerHTML = 'This country has no univerities';
          document.getElementById('top3uni').appendChild(element);
        }
      }
      // console.log('map_zoom', this.refs.map.leafletElement.getZoomLevel());
      console.log('map_zoom_scale', this.refs.map.leafletElement.getScaleZoom());
  }

  onScale(){
    this.setState({
      scale: this.state.scale < 1 ? 1:0
    });
  }


  //Searchbar
  handleChange(e) {
    this.setState({ value: e.target.value });
    this.search(e.target.value)
  }
  search(searched){
  this.props.getSearchResult(searched)
  }
  clearSearch(result, id){
    this.setState({ value: '' });
    this.props.emptySeachResult();
    this.goToSearch(id)
    this.setState({searched:false})
  }
  goToSearch(id){
    this.props.getGEOJSONbyID(id);

  }

  updateSearched(id){
    this.setState({searched:true})
    this.goToSearch(id)
    this.setState({showSearchedMarker:true})
  }

  pointToLayer = (feature, latlng) => {
    var icon_url = 'https://unpkg.com/leaflet@1.2.0/dist/images/marker-icon-2x.png'
    var shadow_url = 'https://unpkg.com/leaflet@1.2.0/dist/images/marker-shadow.png'
    let custom_icon = icon({iconUrl:icon_url,
                            iconSize: [30,50],
                            iconAnchor: [15, 50],
                            popupAnchor: [0, -39],
                            shadowUrl: shadow_url,
                            shadowSize: [50,50],
                            shadowAnchor: [15,50],
                            })
    let default_icon = icon({iconUrl:icon_url,
                            iconSize: [20,30],
                            iconAnchor: [10, 30],
                            popupAnchor: [0, -22],
                            shadowUrl: shadow_url,
                            shadowSize: [30,30],
                            shadowAnchor: [10,30],
                            })
    if(latlng.lat == this.state.custom_marker_pos[1] && latlng.lng==this.state.custom_marker_pos[0]){
      console.log('wasequalposcustommarker');
      return L.marker(latlng, {icon:custom_icon, zIndexOffset: 2000})
    }
    else{
      return L.marker(latlng, {icon: default_icon})
    }
  }

  render() {

    let result = this.props.searchResult.features.map(function(result){
      return(
        <div className="searchItem" onClick={this.updateSearched.bind(this, result._id)}>
          <Glyphicon style={{marginRight: 5, marginLeft:-2}} glyph="glyphicon glyphicon-map-marker" />
          <p style={{fontSize:12}} onClick={this.clearSearch.bind(this, result,result._id)}>{result.properties.university}</p>
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
                  id="searchForm"
                />
                <div className="search-btn" onClick={this.goToSearch.bind(this)}>
                  {(this.props.searchResult.features.length==0)?(<Glyphicon glyph="glyphicon glyphicon-search" />):(<Glyphicon glyph="glyphicon glyphicon-remove" onClick={this.clearSearch.bind(this)}/>)}
                </div>
              { !this.props.searchResult.features.length?(''):(
                  <div style={{backgroundColor: 'white', borderRadius: 2, padding:2, marginTop: 2}}>
                    {result}
                  </div>
                )}

            </form>

            <Map
              id="mapid"
              minZoom={1}
              onMoveend={this.handleMoveend}
              ref="map"
              zoomAnimation='true'
              markerZoomAnimation='true'
              scrollWheelZoom={this.state.scrollWheelZoom}
              bounds={this.state.bounds}
              fillOpacity = {this.state.fillOpacity}
              maxBounds = {this.state.maxBounds}

              zoomDelta={0.5}
              zoomSnap={0}
            >
              <TileLayer
                className = "tileLayer"
                url  = {this.state.tile_layer_url}
                attribution="<attribution>"
                noWrap = {true}
                continuousWorld = {false}
                bounds={outer}
              />

              <KeyHandler keyEventName={KEYDOWN} keyValue="z" onKeyHandle={zDown.bind(null,this)} />
              <KeyHandler keyEventName={KEYUP} keyValue="z" onKeyHandle={zUp.bind(null,this)} />

              <MarkerClusterGroup id="cluster"></MarkerClusterGroup>



              {}



              <GeoJSON ref="geojson" data={world_countries} pointToLayer={this.pointToLayer} style={style.bind(null,this)} onEachFeature={onEachFeature.bind(null, this)}/>
              <GeoJSON ref="popjson" data={this.props.geojson} pointToLayer={this.pointToLayer} style={style.bind(null,this)} onEachFeature={onEachPopUp.bind(null,this)}/>

              <a onClick={resetButton.bind(null,this)} className = "resetZoomButton" href="#" title="ResetZoom" role="button" aria-label="Reset"><Glyphicon className = "resetZoom" glyph="glyphicon glyphicon-repeat" /></a>


              <div className="infoMapDiv">
                {(this.props.top3 !== 0)?(
                  <h3 id='country_displayed' className = 'country_displayed'></h3>
                ):(
                  <h3 id='country_displayed' className = 'country_displayed'>World</h3>
                )}

                <div>
                  {(this.props.top3 !== 0)?(
                    <h5 style={{marginTop: -10}} id="top3uni" className='list_top3'></h5>
                  ):('test')}
                </div>
              </div>

            </Map>
          </div>

        </div>



    );
  }
}
function mapStateToProps(state){
  var top_list = [];
  if(state.map.geojson.features.length < 1){
    top_list = [];
  }else if (state.map.geojson.features.length < 2){
    top_list = state.map.geojson.features.slice(0,1);
  }else if(state.map.geojson.features.length < 3){
    top_list = state.map.geojson.features.slice(0,2);
  }else if(state.map.geojson.features.length >= 3){
    top_list = state.map.geojson.features.slice(0,3);
  }
  return{
    geojson: state.map.geojson,
    searchResult: state.map.searchResult,

    top3: top_list,

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
