
import fetch from 'cross-fetch'
//add functions like the one below-->

export const getGEOJSON = () => {
  return (dispatch) => {
    fetch('http://localhost:8080/uni/all')
      .then(response => response.json())
      .then(json => dispatch({ type: "GEOJSON_RETIREVED", payload: json })
);
  }

};
