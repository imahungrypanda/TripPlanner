import { combineReducers } from 'redux';
import MapReducer from '../map/MapReducer';



const rootReducer = combineReducers({
  map: MapReducer
});

export default rootReducer;