const INITIAL_STATE = {
    uni:[],
    };
    
    export function top4Reducer(state = INITIAL_STATE, action) {
        switch (action.type) {
          case "FETCHED_TOP4":
            return  {...state, uni: action.payload}
            break;
          default:
            return state;
        }
    };
