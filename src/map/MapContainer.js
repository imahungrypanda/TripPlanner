import { connect } from 'react-redux';
import Map from './Map';
import { findLocation, addMarker } from './MapActions';

const mapStateToProps = state => ({
  coords: state.map.coords
});

const mapDispatchToProps = dispatch => ({
  findLocation: () => dispatch(findLocation()),
  addMarker: coords => dispatch(addMarker(coords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);