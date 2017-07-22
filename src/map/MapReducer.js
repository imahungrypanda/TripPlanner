import merge from 'lodash/merge';
import { UPDATELOCATION, SETMARKERS, ADDMARKER, ADDHISTORY, CLEAR } from './MapActions';

const defaultState = {
  lat: 37.7749,
  lng: -122.4149,
  markers: [],
  history: []
}

const MapReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case UPDATELOCATION:
      newState.coords = { lng: action.coords.longitude, lat: action.coords.latitude };

      return newState;

    case SETMARKERS:
      newState.markers = action.markers;

      return newState;

    case ADDMARKER:
      newState.markers.push(action.coords);

      return newState;

    case ADDHISTORY:
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