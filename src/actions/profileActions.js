import API_URL from '../index';


export const deleteUniversity = (email,uni_id) => (dispatch) => {
  console.log('DELETEUNIVERSITY',email, uni_id);
  fetch(`${API_URL}/remove_uni_from_cart/${email}/${uni_id}`)
    .then(response => response.json())
    .then(json => dispatch({ type: 'FETCHED_USER_PROFILE', payload: json}));
};

export const getProfileUniversity = (uni) => {
  return (dispatch) => {
   dispatch({ type: "UNIVERSITY_RETIREVED", payload: uni })
  }

};
export const getCart = (mail) => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.


  return (dispatch) => {
    fetch(API_URL + '/create_or_get_user/' + mail)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "FETCHED_USER_PROFILE", payload: json });
        }
    );
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
