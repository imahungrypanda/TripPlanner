import MapReducer from "../MapReducer";
import { createStore } from 'redux';

describe('MapReducer', () => {
  it('exports an function', () => {
    expect(typeof MapReducer).toEqual('function');
  });

  it('should initialize to the default state', () => {
    const defaultState = {
      start: {},
      end: {},
      coords:  {},
      markers: [],
      history: []
    };

    expect(MapReducer(undefined, {})).toEqual(defaultState);
  });

  it('should return the previous state if an action is not matched', () => {
    const oldState = {
      coords: {lat: 37.7749, lng: -122.4149},
      markers: [],
      history: []
    };
    const newState = MapReducer(oldState, { type: 'unmatchedtype' });
    expect(newState).toEqual(oldState);
  });

  describe('handling UPDATE_LOCATION action', () => {
    let newState,
        coords;

    beforeEach(() => {
      coords = { latitude: 37.7749, longitude: -122.4149 };
      newState = MapReducer(undefined, { type: 'UPDATE_LOCATION', coords });
    });

    it('should update location to new coordinates', () => {
      expect(newState.coords).toEqual({lat: 37.7749, lng: -122.4149});
    });

    it('should not change anything other than coords', () => {
      expect(newState.markers).toEqual([]);
      expect(newState.history).toEqual([]);
    });
  });

  describe('handling SET_MARKERS action', () => {
    it('should reassign markers to the new markers', () => {
      const markers = [
        { position: { lat: 37.7749, lng: -122.4149 }},
        { position: { lat: 40.7128, lng: 74.0059   }},
        { position: { lat: 29.4241, lng: 98.4936   }}
      ];
      const newState = MapReducer(undefined, { type: 'SET_MARKERS', markers });
      expect(newState.markers).toEqual(markers);
    });
  });

  describe('handling SET_START action', () => {
    let marker;

    beforeEach(() => marker = { lat: 29.4241, lng: 98.4936 });

    it('should assign start to the value of the marker', () => {
      const newState = MapReducer(undefined, { type: 'SET_START', marker });
      expect(newState.start.coords).toEqual(marker);
    });

    it('should flip set to true when passed an empty object', () => {
      const newState = MapReducer(undefined, { type: 'SET_START', marker: {} });
      expect(newState.start.set).toBe(true);
    });

    it('should flip set to false when passed an object', () => {
      let newState = MapReducer(undefined, { type: 'SET_START', marker: {} });
      expect(newState.start.set).toBe(true);
      newState = MapReducer(newState, { type: 'SET_START', marker });
      expect(newState.start.set).toBe(false);
    });
  });

  describe('handling SET_END action', () => {
    let marker;

    beforeEach(() => marker = { lat: 29.4241, lng: 98.4936 });

    it('should assign end to the value of the marker', () => {
      const newState = MapReducer(undefined, { type: 'SET_END', marker });
      expect(newState.end.coords).toEqual(marker);
    });

    it('should flip set to true when passed an empty object', () => {
      const newState = MapReducer(undefined, { type: 'SET_END', marker: {} });
      expect(newState.end.set).toBe(true);
    });

    it('should flip set to false when passed an object', () => {
      let newState = MapReducer(undefined, { type: 'SET_END', marker: {} });
      expect(newState.end.set).toBe(true);
      newState = MapReducer(newState, { type: 'SET_END', marker });
      expect(newState.end.set).toBe(false);
    });
  });

  describe('handling ADD_MARKER action', () => {
    let markers,
        newState;

    beforeEach(() => {
      markers = [
        { position: { lat: 37.7749, lng: -122.4149 }},
        { position: { lat: 40.7128, lng: 74.0059   }},
        { position: { lat: 29.4241, lng: 98.4936   }}
      ];
      markers.forEach(marker => {
        newState = MapReducer(newState, { type: 'ADD_MARKER', coords: marker });
      });
    });

    it('should add a new marker', () => {
      expect(newState.markers).toEqual(markers);
    });

    it('should push markers onto the end', () => {
      expect(newState.markers[2]).toEqual(markers[2]);
    });
  });

  describe('handling ADD_HISTORY action', () => {
    let markers,
        newState;

    beforeEach(() => {
      markers = [
        { position: { lat: 37.7749, lng: -122.4149 }},
        { position: { lat: 40.7128, lng: 74.0059   }},
        { position: { lat: 29.4241, lng: 98.4936   }}
      ];
      markers.forEach(marker => {
        newState = MapReducer(newState, { type: 'ADD_HISTORY', history: marker });
      });
    });

    it('should add new entries to the history', () => {
      expect(newState.history).toEqual(markers.reverse());
    });

    it('should add new entires to the front', () => {
      expect(newState.history[0]).toEqual(markers[2]);
    });
  });

  describe('handling CLEAR action', () => {

    it('should clear markers', () => {
      let newState;
      const markers = [
        { position: { lat: 37.7749, lng: -122.4149 }},
        { position: { lat: 40.7128, lng: 74.0059   }},
        { position: { lat: 29.4241, lng: 98.4936   }}
      ];
      markers.forEach(marker => {
        newState = MapReducer(newState, { type: 'ADD_MARKER', coords: marker });
      });

      newState = MapReducer(newState, { type: 'CLEAR'});

      expect(newState.markers).toEqual([]);
    });
  });
});