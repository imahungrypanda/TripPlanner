import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import "./Buttons.css";

const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    display           : 'flex',
    justifyContent    : 'center',
    alignItems        : 'center'
  }
};

class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
      modal: false
    };

    this.placeMarker = this.placeMarker.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.flipModal = this.flipModal.bind(this);
  }

  componentWillMount() {
    this.props.findLocation();
  }

  componentDidMount(){
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);

    let mapOptions = {
      center: {lat: 37.7749, lng: -122.4149},
      zoom: 12
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.map.addListener("click", e => {
      this.placeMarker(e.latLng);
    });
      this.directionsDisplay = new google.maps.DirectionsRenderer();

    document.getElementById('clear').addEventListener("click", e => {
      e.preventDefault();
      this.directionsDisplay.setMap(null);
      this.clearMarkers();
    });

    document.getElementById('route').addEventListener("click", e => {
      e.preventDefault();
      if (Object.keys(this.props.nodes).length === 0) {
        window.alert("Please add a few pins first");
        return ;
      }
      else if (Object.keys(this.props.coords).length === 0) {
        window.alert("Please enable location");
        return ;
      }

      let directions = new google.maps.DirectionsService();


      directions.route({
        origin: this.props.coords,
        destination: this.props.coords,
        waypoints: this.props.nodes.map(node => ({ location: node, stopover: true })),
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, callback.bind(this));

      function callback(response, status) {
        if (status === "OK") {
          let history = {};

          response.routes[0].legs = response.routes[0].legs.filter(leg => leg.distance.value > 0);
          history.name = this.props.getHistoryName(response.routes[0].legs);
          history.response = response;
          history.markers = this.props.markers;

          this.props.addHistory(history);
          this.clearMarkers();

          this.directionsDisplay.setMap(this.map);
          this.directionsDisplay.setDirections(response);
        }
        else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    });

    document.getElementById('history').addEventListener("click", e => {
      e.preventDefault();
      // NOTE maybe have this be a modal that appears?
      console.log("history");
      console.log(this.props.history);
      // this.flipModal();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.coords) {
      let center = new google.maps.LatLng(nextProps.coords.lat, nextProps.coords.lng);
      this.map.panTo(center);
    }
  }

  flipModal() {
    this.setState({ modal: !this.state.modal });
  }

  placeMarker(coords) {
    let marker = new google.maps.Marker({
      position: coords,
      map: this.map
    });
    this.props.addMarker(marker);
  }

  clearMarkers() {
    this.props.markers.forEach(marker => marker.setMap(null));
    this.props.clearMarkers();
  }

  render() {
    const mapStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // TODO add div for time of the best route
    return (
      <div>
        <div id="buttons">
          <button id="clear" >Clear</button>
          <button id="route">Find best route</button>
          <button id="history">History</button>
        </div>
        <div className='Map'>
          <div ref='map' id="map" style={mapStyle}>Map</div>
        </div>
        <Modal
        isOpen={this.state.modal}
        contentLabel="Modal"
        style={modalStyle}
        className="history-modal"
        onRequestClose={this.flipModal} >
          <ul>
            { "test" }
          </ul>
        </Modal >
      </div>
    );
  }
}

export default Map;