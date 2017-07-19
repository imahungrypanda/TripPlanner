import React, { Component } from 'react';
import ReactDOM from 'react-dom'
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log(google.maps);
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    console.log(mapDOMNode);
    let mapOptions = {
      center: {lat: 37.7749, lng: -122.4149},
      zoom: 12
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    console.log(this.map);
  }

  render() {
    const mapStyle = {
      width: 500,
      height: 300,
      border: '1px solid black'
    };

    return (
      <div className='Map'>
        <div ref='map' id="map" style={mapStyle}>Map</div>
      </div>
    );
  }
}

export default App;