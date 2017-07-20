import merge from 'lodash/merge';
import { UPDATELOCATION, ADDMARKER, CLEAR } from './MapActions';

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

    case ADDMARKER:
      newState.markers.push(action.coords);

      return newState;

    case CLEAR:
      newState.history.unshift(newState.markers);
      newState.markers = [];

      return newState;

    default:
      return state;
  }
}

export default MapReducer;