
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
