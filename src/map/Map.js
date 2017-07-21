import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import "./Buttons.css";

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
          this.clearMarkers();
          response.routes[0].legs = response.routes[0].legs.filter(leg => leg.distance.value > 0);
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
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.coords) {
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
      </div>
    );
  }
}

export default Map;