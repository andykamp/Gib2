import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE combinedReducers
import {reducer} from './reducer';


//HERE COMBINE THE REDUCERS
export default combineReducers({
   reducer: reducer,
})
