import {
  setMarkers,
  addMarker,
  addHistory,
  clearMarkers
} from '../MapActions';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

describe('MapActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ map: {} });
  });

  describe('setMarkers', () => {
    it('should return a function', () => {
      expect(typeof setMarkers).toEqual('function');
    });

    it('dispatches addMarkers', () => {
      const markers = [
        { position: { lat: 37.7749, lng: -122.4149 }},
        { position: { lat: 40.7128, lng: 74.0059   }},
        { position: { lat: 29.4241, lng: 98.4936   }}
      ];
      const expectedActions = [{ type: 'SET_MARKERS', markers }];

      store.dispatch(setMarkers(markers));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('addMarker', () => {
    it('should return a function', () => {
      expect(typeof addMarker).toEqual('function');
    });

    it('dispatches addMarker', () => {
      const coords = { position: { lat: 37.7749, lng: -122.4149 }};
      const expectedActions = [{ type: 'ADD_MARKER', coords }];

      store.dispatch(addMarker(coords));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('addHistory', () => {
    it('should return a function', () => {
      expect(typeof addHistory).toEqual('function');
    });

    it('dispatches addHistory', () => {
      const history = { position: { lat: 37.7749, lng: -122.4149 }};
      const expectedActions = [{ type: 'ADD_HISTORY', history }];

      store.dispatch(addHistory(history));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('clearMarkers', () => {
    it('should return a function', () => {
      expect(typeof clearMarkers).toEqual('function');
    });

    it('dispatches clearMarkers', () => {
      const expectedActions = [{ type: 'CLEAR' }];

      store.dispatch(clearMarkers());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});