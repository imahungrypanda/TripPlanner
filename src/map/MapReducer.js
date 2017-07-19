import merge from 'lodash/merge';
import UPDATELOCATION from './MapActions';

const MapReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case UPDATELOCATION:
      newState.coords = action.coords
      return newState;
    default:
      return state;
  }

}

export default MapReducer;