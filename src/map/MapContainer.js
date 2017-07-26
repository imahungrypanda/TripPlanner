import { connect } from 'react-redux';
import Map from './Map';
import { findLocation, addMarker, setStart, setEnd } from './MapActions';

const mapStateToProps = state => ({
  start: state.map.start.set,
  end: state.map.end.set,
  coords: state.map.coords
});

const mapDispatchToProps = dispatch => ({
  setStart: marker => dispatch(setStart(marker)),
  setEnd: marker => dispatch(setEnd(marker)),
  findLocation: () => dispatch(findLocation()),
  addMarker: coords => dispatch(addMarker(coords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);