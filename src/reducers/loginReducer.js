
const INITIAL_STATE = {
loggedIn: false,
mail:''
};

export function loginReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "LOGGED_IN":
        return  {...state, loggedIn: true, mail: action.payload}
        break;
      case "LOGGED_OUT":
        return  {...state, loggedIn: false}
        break;
      default:
        return state;
    }
};
