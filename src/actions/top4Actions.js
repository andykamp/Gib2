import { API_URL } from '../index';

export const getTop4 = () => (dispatch) => {
  fetch(`${API_URL}/get_top_stared_universities/`)
    .then(response => response.json())
    .then(json => dispatch({ type: 'FETCHED_TOP4', payload: json}));
};
