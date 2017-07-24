import React, { Component } from 'react';
import Modal from 'react-modal';
import { modalStyle } from './ModalStyle';
import './Buttons.css';

class Buttons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.clearMap = this.clearMap.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.createHistory = this.createHistory.bind(this);
    this.flipModal = this.flipModal.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

  componentDidMount() {
    document.getElementById('clear').addEventListener("click", e => {
      e.preventDefault();
      this.clearMap();
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

      this.getDirections();
    });

    document.getElementById('history').addEventListener("click", e => {
      e.preventDefault();
      this.flipModal();
    });
  }

  createHistory() {
    if (this.props.history.length === 0) {
      return (<li>No routes have been found</li>);
    }

    return this.props.history.map((route, i) => {
      return (
        <li key={ i } onClick={ () => {
            this.flipModal();
            this.clearMap();
            this.clearMarkers();
            this.props.setMarkers(route.markers);
            route.markers.forEach(marker => marker.setMap(this.props.map));
          } }>
          { route.name }
        </li>
      );
    });
  }

  clearMap() {
    this.props.directionsDisplay.setMap(null);
  }

  clearMarkers() {
    if (this.props.markers.length === 0) { return; }
    this.props.markers.forEach(marker => marker.setMap(null));
    this.props.clearMarkers();
  }

  flipModal() {
    this.setState({ modal: !this.state.modal });
  }

  getDirections() {
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
        history.markers = this.props.markers;

        this.props.addHistory(history);
        this.clearMarkers();

        this.props.directionsDisplay.setMap(this.props.map);
        this.props.directionsDisplay.setDirections(response);
      }
      else {
        window.alert('Directions request failed due to ' + status);
      }
    }
  }

  render() {
    return(
      <div id="buttons">
        <button id="clear" >Clear</button>
        <button id="route">Find Best Route</button>
        <button id="history">History</button>
        <Modal isOpen={this.state.modal}
        contentLabel="Modal"
        style={ modalStyle }
        className="history-modal"
        onRequestClose={this.flipModal} >
          <p onClick={ () => this.flipModal() }>x</p>
          <ul>{ this.createHistory() }</ul>
        </Modal >
      </div>
    );
  }
}

export default Buttons;