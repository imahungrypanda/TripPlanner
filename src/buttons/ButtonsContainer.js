import { connect } from 'react-redux';
import Buttons from './Buttons';
import { addHistory, clearMarkers, setMarkers, setStart, setEnd } from '../map/MapActions';
import { parseMarkers, parseHistoryName } from '../map/MapUtil';

const mapStateToProps = state => ({
  start: state.map.start,
  end: state.map.end,
  coords: state.map.coords,
  nodes: parseMarkers(state.map.markers),
  markers: state.map.markers,
  history: state.map.history
});

const mapDispatchToProps = dispatch => ({
  setStart: marker => dispatch(setStart(marker)),
  setEnd: marker => dispatch(setEnd(marker)),
  setMarkers: markers => dispatch(setMarkers(markers)),
  addHistory: history => dispatch(addHistory(history)),
  clearMarkers: () => dispatch(clearMarkers()),
  getHistoryName: legs => parseHistoryName(legs)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buttons);
