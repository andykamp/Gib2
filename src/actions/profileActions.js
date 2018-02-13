


export const getUniversities = () => {
  return (dispatch) => {
    fetch('http://localhost:8080/uni_in_country/taiwan')
      .then(response => response.json())
      .then(json => dispatch({ type: "FETCHED_UNIVERSITIES", payload: json })
);
  }

};
export const setInfo = ({ prop, value }) => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.
  return {
    type: "INFO_RETIREVED",
    payload: { prop, value }
  };
};
