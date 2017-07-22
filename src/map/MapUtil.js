export const parseMarkers = markers => {
  return markers.map(marker => {
    return { lat: marker.position.lat(), lng: marker.position.lng() }
    });
};

export const parseHistoryName = legs => {
  let name = [];

  legs.forEach(leg => name.push(leg.start_address.split(",")[0]));

  return name.join(" - ");
};