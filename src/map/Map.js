import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import "./Buttons.css";
// import { createGraph } from './MapUtil';

class Map extends Component {
  constructor(props){
    super(props);

    this.placeMarker = this.placeMarker.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.createGraph = this.createGraph.bind(this);
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

    document.getElementById('route').addEventListener("click", e => {
      e.preventDefault();
      // NOTE route will be what creates the graph and determines the best route.
      // NOTE consider adding all the paths from each marker before finding the best path
      // console.log("route");

      let service = new google.maps.DistanceMatrixService();
      let origins = this.props.nodes;
      // console.log(origins)
      origins.unshift(this.props.coords)
      console.log(origins)
      console.log("route");

      service.getDistanceMatrix(
      {
        origins: origins,
        destinations: this.props.nodes,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, callback);


     const callback = (response, status) => {
        let result = {};
        console.log("route");
        if (status != google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
        } else {
          let origins = response.originAddresses;
          let destinations = response.destinationAddresses;
          result.origins = origins;
console.log("route");
          for (let i = 0; i < origins.length; i++) {
            let elements = response.rows[i].elements;
            let arr = [];
            for (var j = i + 1; j < elements.length; j++) {
              // console.log(elements[j]);
              arr.push({ dest: origins[j], time: elements[j].duration.value, dist: elements[j].distance.value });
            }
console.log("route");
            result[origins[i]] = arr;
          }
        }
console.log("route");
        // console.table(result);
        // this.createGraph(result);
    }














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

  createGraph(routes){
    console.log(routes);
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