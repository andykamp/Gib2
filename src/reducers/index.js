"use strict"
import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE combinedReducers
import {cartReducers} from './cartReducers';
import {mapReducer} from './mapReducer';
import {profileReducer} from './profileReducer';
import {loginReducer} from './loginReducer';
import {universityReducer} from './universityReducer';


//HERE COMBINE THE REDUCERS
export default combineReducers({
  cart: cartReducers,
  map: mapReducer,
  profile: profileReducer,
  login: loginReducer,
  university: universityReducer,
})
