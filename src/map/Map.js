import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Buttons from '../buttons/ButtonsContainer';

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
    console.log(this.props);
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);

    let mapOptions = {
      center: {lat: 37.7749, lng: -122.4149},
      zoom: 12
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.map.addListener("click", e => {
      this.placeMarker(e.latLng);
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    if (this.props.coords !== nextProps.coords) {
      let center = new google.maps.LatLng(nextProps.coords.lat, nextProps.coords.lng);
      this.map.panTo(center);
    }
    if (nextProps.clear && !this.props.clear) {
      this.clearMarkers();
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
    this.props.markers.forEach(marker => console.log(marker));
  }

  render() {
    const mapStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    return (
      <div className='Map'>

        <div ref='map' id="map" style={mapStyle}>Map</div>
      </div>
    );
  }
}

export default Map;