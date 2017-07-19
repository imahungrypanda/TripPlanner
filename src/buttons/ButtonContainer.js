import { connect } from 'react-redux';
import Buttons from './Buttons';
import { clearMarkers } from '../map/MapActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  clearMarkers: () => dispatch(clearMarkers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buttons)