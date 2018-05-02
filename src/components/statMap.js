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
      return p > repList[4]? '#ff6500' :
             p > repList[3]? '#ffa500' :
             p > repList[2]? '#ffba3b' :
             p > repList[1]? '#ffcf76' :
                            '#ffeac4';
    }
    else if(component.state.mapType==="university_rating"){
      return p > uniList[4]? '#ff6500' :
             p > uniList[3]? '#ffa500' :
             p > uniList[2]? '#ffba3b' :
             p > uniList[1]? '#ffcf76' :
                            '#ffeac4';
    }
    else{
      return p >= 5? '#ff6500' :
             p >= 4? '#ffa500' :
             p >= 3 ? '#ffba3b' :
             p >= 2? '#ffcf76' :
                    '#ffeac4';
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
function highlightFeature (feature, e) {
  var layer = e.target;


  // this.setState({countryDisplayed:feature.properties.name})
  countryNameDisplayed= feature.properties.name;
}

// reset default style on mouseOut
function resetHighlight (feature, e) {
  // component.refs.geojson.leafletElement.resetStyle(e.target);
  var layer = e.target;

}


function onEachFeature (component, feature, layer) {
  layer.on({
    mouseover: highlightFeature.bind(null, feature),
    mouseout: resetHighlight.bind(null, feature),
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
              component.setState({bounds: init_bounds})
              // component.setState({tile_layer_url: tile_layer})
              // num_countryuni = component.props.num_uni;
              // console.log('num_uni map',num_countryuni);

          };
      },
  });
}

function onEachPopUp(component, feature, layer) {
    layer.on({
    mouseover: function(){
      change_zoom = false;
//"<img style='height:15px;width:15px;margin-bottom:2px' src="+require('../images/exit.png')+"/>"+ "<br>"+
      // var content = feature.properties.universitet
      // layer.bindPopup(content)
      // //hvis vi vil begrense popupen
      // //layer.bindPopup(content, {maxWidth: 100, maxHeight: 100})
      // layer.openPopup()
    },
    mouseout: function(){
      change_zoom = true;
    },
    click: function(){
      //get coordinates of uni
      var temp_pos = feature.geometry.coordinates;

      var init_bounds = [[temp_pos[1]-0.1,temp_pos[0]-0.1],[temp_pos[1]+0.1,temp_pos[0]+0.1]];
      component.setState({bounds: init_bounds})
      // console.log('LAYER', layer.properties)
      // component.props.getUniversities(feature.properties._id)

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
      mapType: "report_rating",
    }
  this.handleClick = this.handleClick.bind(this);
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
            >

            <div className = 'legend'>
            <p> {name}</p>
            <ul class = 'list-unstyled'>
            <li><span className= 'colorBox' style = {{background:'#ffeac4'}}></span><p> {list[0]}-{list[1]} </p> </li>
            <li><span className= 'colorBox' style = {{background:'#ffcf76'}}></span><p> {list[1]}-{list[2]}</p> </li>
            <li><span className= 'colorBox' style = {{background:'#ffba3b'}}></span><p> {list[2]}-{list[3]}</p> </li>
            <li><span className= 'colorBox' style = {{background:'#ffa500'}}></span><p> {list[3]}-{list[4]}</p> </li>
            <li><span className= 'colorBox' style = {{background:'#ff6500'}}></span><p> {list[4]}-</p> </li>
            </ul>
            </div>


            <div class="btn-group" style={{position: 'absolute', right:'100px', top: '10px'}}>
            <button id ='rapStat' onClick ={this.handleClick.bind(this)}>Studenter</button>
            <button id = 'uniStat'onClick ={this.handleClick.bind(this)}>Universiteter </button>
            <button id = 'sosStat' onClick ={this.handleClick.bind(this)}>Sosial</button>
            <button id = 'akaStat' onClick ={this.handleClick.bind(this)}>Akademisk</button>
            </div>

              {/* <GeoJSON ref="geojson" data={world_countries} style={style} onEachFeature={onEachFeature.bind(null, this)}/>*/}
              {/* <GeoJSON ref="popjson" data={this.props.geojson} style={style} onEachFeature={onEachPopUp.bind(null,this)}/> */}
            {/*   <GeoJSON ref="popjson" data={universities} pointToLayer={this.pointToLayer.bind(this)}/>*/}
            {/*   <GeoJSON ref="geojson" data={clor} style={style} />*/}
              {/* <a onClick={this.resetButton.bind(this)} className = "resetZoomButton" href="#" title="ResetZoom" role="button" aria-label="Reset"><Glyphicon className = "resetZoom" glyph="glyphicon glyphicon-repeat" /></a>*/}
           <GeoJSON ref="geojson" data={this.props.choropleth} style={style.bind(null, this)} onEachFeature={onEachFeature.bind(null, this)}/>

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
