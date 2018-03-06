const geo = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {

      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [

          ]
        ]
      }
    }
  ]
}

const INITIAL_STATE = {
geojson: geo,
};

export function mapReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "GEOJSON_RETIREVED":
        return  {...state, geojson: action.payload}
        break;
      default:
        return state;
    }
};
