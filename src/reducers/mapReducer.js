const geo = {
  "type": "FeatureCollection",
  "features": [
  
  ]
}

const INITIAL_STATE = {
geojson: geo,
searchResult: geo,
};

export function mapReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "GEOJSON_RETIREVED":
        return  {...state, geojson: action.payload}
        break;
      case 'SEARCH_RETIREVED':
        return  {...state, searchResult: action.payload}
        break;
      case 'SEARCH_EMPTY':
        return {...state, searchResult: geo}
        break;
      default:
        return state;
    }
};
