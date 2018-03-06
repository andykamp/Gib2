


export const getProfileUniversity = (uni) => {
  return (dispatch) => {
   dispatch({ type: "UNIVERSITY_RETIREVED", payload: uni })
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
