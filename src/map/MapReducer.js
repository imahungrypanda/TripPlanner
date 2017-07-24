import merge from 'lodash/merge';
import { UPDATE_LOCATION, SET_MARKERS, ADD_MARKER, ADD_HISTORY, CLEAR } from './MapActions';

const defaultState = {
  coords:  {},
  markers: [],
  history: []
};

const MapReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case UPDATE_LOCATION:
      newState.coords = { lat: action.coords.latitude, lng: action.coords.longitude };

      return newState;

    case SET_MARKERS:
      newState.markers = action.markers;

      return newState;

    case ADD_MARKER:
      newState.markers.push(action.coords);

      return newState;

    case ADD_HISTORY:
      newState.history.unshift(action.history);

      return newState;

    case CLEAR:
      newState.markers = [];

      return newState;

    default:
      return state;
  }
}

export default MapReducer;