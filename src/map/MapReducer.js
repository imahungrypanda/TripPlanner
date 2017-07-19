import merge from 'lodash/merge';
import { UPDATELOCATION, ADDMARKER } from './MapActions';

const defaultState = {
  lat: 37.7749,
  lng: -122.4149,
  markers: []
}

const MapReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch(action.type){
    case UPDATELOCATION:
      newState.lng = action.coords.longitude;
      newState.lat = action.coords.latitude;

      return newState;

    case ADDMARKER:
      newState.markers.push(action.coords);

      return newState;

    default:
      return state;
  }

}

export default MapReducer;