import _ from 'lodash';
import { UPDATE_LOCATION, SET_MARKERS, SET_START, SET_END,
          ADD_MARKER, ADD_HISTORY, CLEAR } from './MapActions';

const defaultState = {
  start: {},
  end: {},
  coords:  {},
  markers: [],
  history: []
};

const MapReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = _.merge({}, state);

  switch(action.type){
    case UPDATE_LOCATION:
      newState.coords = { lat: action.coords.latitude, lng: action.coords.longitude };

      return newState;

    case SET_MARKERS:
      newState.markers = action.markers;

      return newState;

    case SET_START:
      if (_.isEmpty(action.marker)) {
        newState.start.set    = !newState.start.set;
      }
      else {
        newState.start.set    = !newState.start.set;
        newState.start.coords = action.marker;
      }

      return newState;

    case SET_END:
      if (_.isEmpty(action.marker)) {
        newState.end.set    = !newState.end.set;
      }
      else {
        newState.end.set    = !newState.end.set;
        newState.end.coords = action.marker;
      }

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