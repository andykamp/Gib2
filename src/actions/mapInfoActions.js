import API_URL from '../index';

export const getUniversities = id => (dispatch) => {
  fetch(`${API_URL}/get_university_by_id/${id}`)
    .then(response => response.json())
    .then(json => dispatch({ type: 'UNIVERSITY_RETIREVED', payload: json }));
    fetch(`${API_URL}/get_reports_for_university/${id}`)
      .then(response => response.json())
      .then(json => {
        // console.log('huythugg hguiv vjh',json.slice(0,3))
        dispatch({ type: 'FETCHED_REPORTS', payload: (json.length>2)? json.slice(0,3):json})
      });
};

export const add_favorite_university = (email,uni_id) => (dispatch) => {
  fetch(`${API_URL}/add_uni_to_cart/${email}/${uni_id}`)
    .then(response => response.json())
    .then(json => dispatch({ type: 'FETCHED_USER_PROFILE', payload: json}));
};




export const getReports = (id) => (dispatch) => {
  fetch(`${API_URL}/add_reports_for_university/${id}`)
    .then(response => response.json())
    .then(json => dispatch({ type: 'FETCHED_USER_PROFILE', payload: json}));
};
