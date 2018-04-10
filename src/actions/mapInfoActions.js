import API_URL from '../index';

export const getUniversities = url => (dispatch) => {
  fetch(`${API_URL}/${url}`)
    .then(response => response.json())
    .then(json => dispatch({ type: 'UNIVERSITY_RETIREVED', payload: json }));
};
