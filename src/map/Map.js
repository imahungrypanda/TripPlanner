import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class Map extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    let mapOptions = {
      center: {lat: 37.7749, lng: -122.4149},
      zoom: 12
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    console.log(navigator.geolocation);
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