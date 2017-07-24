export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const SET_MARKERS = "SET_MARKERS";
export const ADD_MARKER = "ADD_MARKER";
export const CLEAR = "CLEAR";
export const ADD_HISTORY = "ADD_HISTORY";

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
  type: UPDATE_LOCATION,
  coords
});

export const addMarkers = markers => ({
  type: SET_MARKERS,
  markers
});

export const pushMarker = coords => ({
  type: ADD_MARKER,
  coords
});

export const pushHistory = history => ({
  type: ADD_HISTORY,
  history
});

export const deleteMarkers = () => ({
  type: CLEAR
});