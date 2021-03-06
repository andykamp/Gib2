const geo = {
  "type": "FeatureCollection",
  "features": [

  ]
}

const INITIAL_STATE = {
geojson: geo,
searchResult: geo,
uni_all:geo,
reports:[],
choropleth: geo,
money: geo,
};

export function mapReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "GEOJSON_RETIREVED":
        return  {...state, geojson: action.payload}
        break;
      case 'SEARCH_RETIREVED':
        return  {...state, searchResult: action.payload}
        break;
      case 'ALL_GEOJSON_RETIREVED':
        return  {...state, uni_all: action.payload}
        break;
      case 'SEARCH_EMPTY':
        return {...state, searchResult: geo}
        break;
      case 'FETCHED_REPORTS':
        return {...state, reports: action.payload}
        break;
      case 'ALL_CHOROPLETH_RETIREVED':
        return {...state, choropleth: action.payload}
        break;
      case 'ALL_MONEY_RETIREVED':
        return {...state, money: action.payload}
        break;
      case 'DELETE_GEOJSON':
        return {...state, geojson: geo}
        break;
      default:
        return state;
    }
};
