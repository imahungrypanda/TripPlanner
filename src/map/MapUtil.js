// import { Graph } from 'graphlib';

export const parseMarkers = markers => {
  return markers.map(marker => {
    return { lat: marker.position.lat(), lng: marker.position.lng() }
    });
};


export const createGraph = routes => {
  // let g = new Graph();
  console.log(routes);
};
