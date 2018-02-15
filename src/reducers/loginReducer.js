
const INITIAL_STATE = {
loggedIn: false
};

export function loginReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "LOGGED_IN":
        return  {...state, loggedIn: true}
        break;
      default:
        return state;
    }
};
