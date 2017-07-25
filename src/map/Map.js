import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { modalStyle } from '../buttons/ModalStyle';
import Buttons from '../buttons/ButtonsContainer';
import "./Map.css";

class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
      modal: true
    };

    this.placeMarker = this.placeMarker.bind(this);
    this.flipModal = this.flipModal.bind(this);
  }

  componentWillMount() {
    this.props.findLocation();
  }

  componentDidMount(){
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);

    let mapOptions = {
      center: {lat: 37.7749, lng: -122.4149}, // Centered on SF, CA
      zoom: 12
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    this.map.addListener("click", e => {
      this.directionsDisplay.setMap(null);
      this.placeMarker(e.latLng);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(this.props.coords).length === 0 && Object.keys(nextProps.coords).length > 0) {
      let center = new google.maps.LatLng(nextProps.coords.lat, nextProps.coords.lng);
      this.map.panTo(center);
    }
  }

  placeMarker(coords) {
    let marker = new google.maps.Marker({
      position: coords,
      map: this.map
    });

    if (this.props.start) {
      this.props.setStart(coords);
    }
    else {
      this.props.addMarker(marker);
    }
  }

  flipModal() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const mapStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // TODO add div for time of the best route
    return (
      <div>
        <Buttons map={ this.map } directionsDisplay={ this.directionsDisplay }/>
        <div className='Map'>
          <div ref='map' id="map" style={mapStyle}>Map</div>
        </div>
        <Modal isOpen={this.state.modal}
        contentLabel="Modal"
        style={ modalStyle }
        className="instruction-modal"
        onRequestClose={ this.flipModal } >
          <div style={ {width: '500px', textAlign: 'center', padding: '10px', background: 'white' } }>
            <h3>Welcome to Trip Planner!</h3>
            <p style={ { textAlign: 'justify' } }>To began place a few markers on the map, then when ready click Find Best Route to find the optimal route from your current location to all the waypoints ending back at your current location.</p>
          </div>
        </Modal >
      </div>
    );
  }
}

export default Map;