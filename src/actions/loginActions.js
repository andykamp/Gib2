import API_URL from '../index';

export const setLoginInfo = (mail) => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.

  
  console.log(API_URL + '/create_or_get_user/' + mail)
  return (dispatch) => {
    fetch(API_URL + '/create_or_get_user/' + mail)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: "FETCHED_USER_PROFILE", payload: json });
        dispatch({ type: "LOGGED_IN", payload: mail});
        }
    );
  }
};
export const ContinueWithoutLogin= (mail) => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.

  return {
    type: "LOGGED_IN",
     payload: mail
  };
};
export const setLoginFalse= () => {
  //sets info from different student-scenes in reducer.
  //a combined way of writhing one actioncreater for different instances.

  return {
    type: "LOGGED_OUT",
  };
};

// const getUserProfile = (json) => {
//   const uni= json.my_universities.keys().map(function(id){
//     return(
//       fetch(API_URL + '/get_university_by_id/' + id)
//         .then(response => response.json())
//         .then(json => {
//     );
//   })
// };
