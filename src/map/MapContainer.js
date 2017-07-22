import { connect } from 'react-redux';
import Map from './Map';
import { findLocation, setMarkers, addMarker, addHistory, clearMarkers } from './MapActions';
// import { parseMarkers, parseHistoryName } from './MapUtil';

const mapStateToProps = state => ({
  coords: state.map.coords
  // markers: state.map.markers,
  // nodes: parseMarkers(state.map.markers),
  // history: state.map.history
});

const mapDispatchToProps = dispatch => ({
  findLocation: () => dispatch(findLocation()),

  addMarker: coords => dispatch(addMarker(coords))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);


  // addHistory: history => dispatch(addHistory(history)),
  // clearMarkers: () => dispatch(clearMarkers()),
  // getHistoryName: legs => parseHistoryName(legs)