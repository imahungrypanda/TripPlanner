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

    document.getElementById('clear').addEventListener("click", e => {
      e.preventDefault();
      this.clearMarkers();
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
  }

  render() {
    const mapStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    };

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