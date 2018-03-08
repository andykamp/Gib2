
import fetch from 'cross-fetch'
//add functions like the one below-->

export const getGEOJSON = (name) => {
  return (dispatch) => {
    fetch('http://localhost:8080/uni_in_country/' + name)
      .then(response => response.json())
      .then(json => dispatch({ type: "GEOJSON_RETIREVED", payload: json })
);
  }

};
export const getGEOJSONbyID = (id) => {
  return (dispatch) => {
    fetch('http://localhost:8080/get_university_geojson_by_id/' + id)
      .then(response => response.json())
      .then(json => dispatch({ type: "GEOJSON_RETIREVED", payload: json })
);
  }

};

export const getSearchResult = (searched) => {
  console.log('searched',searched);
  return (dispatch) => {
    fetch('http://localhost:8080/search_universities/' + searched)
      .then(response => response.json())
      .then(json => dispatch({ type: "SEARCH_RETIREVED", payload: json })
);
  }

};
export const emptySeachResult =() => {
  return {
         type: "SEARCH_EMPTY"
       }
  }
