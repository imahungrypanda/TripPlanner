import { connect } from 'react-redux';
import Map from './Map';
import { findLocation, addMarker, clearMarkers } from './MapActions';

const mapStateToProps = state => ({
  coords: state.map.coords,
  markers: state.map.markers,
  clear: state.map.history[0]
});

const mapDispatchToProps = dispatch => ({
  findLocation: () => dispatch(findLocation()),
  addMarker: coords => dispatch(addMarker(coords)),
  clearMarkers: () => dispatch(clearMarkers())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);