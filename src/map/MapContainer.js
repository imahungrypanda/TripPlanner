import { connect } from 'react-redux';
import Map from './Map';
import { findLocation, addMarker, clearMarkers } from './MapActions';
import { parseMarkers, createGraph } from './MapUtil';

const mapStateToProps = state => ({
  coords: state.map.coords,
  markers: state.map.markers,
  nodes: parseMarkers(state.map.markers),
  clear: state.map.history[0]
});

const mapDispatchToProps = dispatch => ({
  findLocation: () => dispatch(findLocation()),
  addMarker: coords => dispatch(addMarker(coords)),
  clearMarkers: () => dispatch(clearMarkers())
  // createGraph: routes => createGraph(routes)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);