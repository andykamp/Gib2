
export const getUniversities = (url) => {
  return (dispatch) => {
    fetch('http://localhost:8080/' + url)
      .then(response => response.json())
      .then(json => dispatch({ type: "UNIVERSITY_RETIREVED", payload: json })
);
  }

};
