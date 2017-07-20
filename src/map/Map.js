import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import "./Buttons.css";
import { createGraph } from './MapUtil';

class Map extends Component {
  constructor(props){
    super(props);

    this.placeMarker = this.placeMarker.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
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
      this.clearMarkers();
    });

    document.getElementById('route').addEventListener("click", e => {
      e.preventDefault();

      if (Object.keys(this.props.coords).length === 0) {}

      let directions = new google.maps.DirectionsService();
      this.directionsDisplay.setMap(this.map);

      directions.route({
        origin: this.props.coords,
        destination: this.props.coords,
        waypoints: this.props.nodes.map(node => ({ location: node, stopover: true })),
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, function(response, status) {
        if (status === "OK") {
          response.routes[0].legs = response.routes[0].legs.filter(leg => leg.distance.value > 0);
        // response.routes[0].legs.forEach(leg => console.log("Start: ", leg.start_address, "  End: ", leg.end_address))
          this.directionsDisplay.setDirections(response);
        }
        else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });

    document.getElementById('history').addEventListener("click", e => {
      e.preventDefault();
      // NOTE maybe have this be a modal that appears?
      console.log("history");
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    if (this.props.coords !== nextProps.coords) {
      let center = new google.maps.LatLng(nextProps.coords.lat, nextProps.coords.lng);
      this.map.panTo(center);
    }
  }

  placeMarker(coords) {
    let marker = new google.maps.Marker({
      position: coords,
      map: this.map
    });
    this.props.addMarker(marker);
  }

  clearMarkers() {
    this.props.clearMarkers();
    this.props.clear.forEach(marker => marker.setMap(null));
    this.directionsDisplay.setMap(null);
  }

  render() {
    const mapStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // TODO add div for errors
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
      </div>
    );
  }
}

export default Map;