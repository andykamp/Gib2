
import fetch from 'cross-fetch';
import API_URL from '../index';


export const get_all_GEOJSON = () => {
  const id= '5a59f39098c056e100406ac4'
  return (dispatch) => {
    fetch(`${API_URL}/list_all_uni_as_geo_json`)
      .then(response => response.json())
      .then(json => dispatch({ type: 'ALL_GEOJSON_RETIREVED', payload: json }));
  };
};
export const getGEOJSON = (name) => {

  return (dispatch) => {
    fetch(`${API_URL}/uni_in_country/${name}`)
      .then(response => response.json())
      .then(json => dispatch({ type: 'GEOJSON_RETIREVED', payload: json }));
  };
};

export const getGEOJSONbyID = (id) => {
  return (dispatch) => {
    fetch(`${API_URL}/get_university_geojson_by_id/${id}`)
      .then(response => response.json())
      .then(json => dispatch({ type: 'GEOJSON_RETIREVED', payload: json }));
  };
};

export const getSearchResult = (searched) => {
  return (dispatch) => {
    fetch(`${API_URL}/search_universities/${searched}`)
      .then(response => response.json())
      .then(json => dispatch({ type: 'SEARCH_RETIREVED', payload: json }));
  };
};

export const emptySeachResult = () => {
  return {
    type: 'SEARCH_EMPTY',
  };
};
