export const UPDATELOCATION = "UPDATELOCATION";
export const SETMARKERS = "SETMARKERS";
export const ADDMARKER = "ADDMARKER";
export const CLEAR = "CLEAR";
export const ADDHISTORY = "ADDHISTORY";

export const findLocation = () => dispatch =>{
  navigator.geolocation.getCurrentPosition((position) => {
    dispatch(updateLocation(position.coords));
  });
};

export const setMarkers = markers => dispatch => {
  dispatch(addMarkers(markers));
};

export const addMarker = coords => dispatch => {
  dispatch(pushMarker(coords));
};

export const addHistory = history => dispatch => {
  dispatch(pushHistory(history));
};

export const clearMarkers = () => dispatch => {
  dispatch(deleteMarkers());
};

export const updateLocation = coords => ({
  type: UPDATELOCATION,
  coords
});

export const addMarkers = markers => ({
  type: SETMARKERS,
  markers
});

export const pushMarker = coords => ({
  type: ADDMARKER,
  coords
});

export const pushHistory = history => ({
  type: ADDHISTORY,
  history
});

export const deleteMarkers = () => ({
  type: CLEAR
});