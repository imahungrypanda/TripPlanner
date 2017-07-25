export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const SET_MARKERS = "SET_MARKERS";
export const SET_START = "SET_START";
export const SET_END = "SET_END";
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

export const setStart = marker => dispatch => {
  dispatch(addStart(marker));
};

export const setEnd = marker => dispatch => {
  dispatch(addEnd(marker));
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

export const addStart = marker => ({
  type: SET_START,
  marker
});

export const addEnd = marker => ({
  type: SET_END,
  marker
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