export const parseMarkers = markers => {
  return markers.map(marker => {
    return { lat: marker.position.lat(), lng: marker.position.lng() }
    });
};