import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class Map extends Component {
  constructor(props){
    super(props);

    this.placeMarker = this.placeMarker.bind(this);
  }

  componentDidMount(){
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    let mapOptions = {
      center: {lat: 37.7749, lng: -122.4149},
      zoom: 12
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.map.addListener("click", e => {
      console.log(e.latLng);
      this.placeMarker(e.latLng);
    });
  }

  placeMarker(coords) {
    let marker = new google.maps.Marker({
      position: coords,
      map: this.map
    });
  }

  render() {
    const mapStyle = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    console.log(window.heigth);

    return (
      <div className='Map'>
        <div ref='map' id="map" style={mapStyle}>Map</div>
      </div>
    );
  }
}

export default Map;