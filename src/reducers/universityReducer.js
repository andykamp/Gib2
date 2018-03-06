

const INITIAL_STATE = {
  university:{}
};

export function universityReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "UNIVERSITY_RETIREVED":
        return  {...state, university: action.payload}
        break;
      default:
        return state;
    }
};
