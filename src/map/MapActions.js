export const UPDATELOCATION = "UPDATELOCATION";
export const ADDMARKER = "ADDMARKER";
export const CLEAR = "CLEAR";

export const findLocation = () => dispatch =>{
  navigator.geolocation.getCurrentPosition((position) => {
    dispatch(updateLocation(position.coords));
  });
};

export const addMarker = coords => dispatch => {
  dispatch(pushMarker(coords));
}

export const clearMarkers = () => dispatch => {
  dispatch(deleteMarkers());
}

export const updateLocation = coords => ({
  type: UPDATELOCATION,
  coords
})

export const pushMarker = coords => ({
  type: ADDMARKER,
  coords
});

export const deleteMarkers = () => ({
  type: CLEAR
});