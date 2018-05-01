


export const getProfileUniversity = (uni) => {
  return (dispatch) => {
   dispatch({ type: "UNIVERSITY_RETIREVED", payload: uni })
  }

};
export const getProfileNotesAndLinks = (notes, links) => {
  return (dispatch) => {
   dispatch({ type: "NOTES_RETIREVED", payload: notes })
   dispatch({ type: "LINKS_RETIREVED", payload: links })
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
