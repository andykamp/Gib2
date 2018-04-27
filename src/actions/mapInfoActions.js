import API_URL from '../index';

export const getUniversities = url => (dispatch) => {
  fetch(`${API_URL}/get_university_by_id/${url}`)
    .then(response => response.json())
    .then(json => dispatch({ type: 'UNIVERSITY_RETIREVED', payload: json }));
};

export const add_favorite_university = (email,uni_id) => (dispatch) => {
  fetch(`${API_URL}/add_uni_to_cart/${email}/${uni_id}`)
    .then(response => response.json())
    .then(json => dispatch({ type: 'ADDED_FAVORITE'}));
};
