

const INITIAL_STATE = {
geojson: {},
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
