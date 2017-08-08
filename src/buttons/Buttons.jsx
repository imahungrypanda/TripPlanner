import React, { Component } from 'react';
import Modal from 'react-modal';
import { modalStyle } from './ModalStyle';
import './Buttons.css';
import _ from 'lodash';

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
    document.getElementById('start').addEventListener("click", e => {
      if (this.props.end.set) {
        window.alert("Please select end location first");
        document.getElementById("end").focus();
        return;
      }
      this.props.setStart({});
    });
    document.getElementById('end').addEventListener("click", e => {
      if (this.props.start.set) {
        window.alert("Please select start location first");
        document.getElementById("start").focus();
        return;
      }
      this.props.setEnd({});
    });

    document.getElementById('clear').addEventListener("click", e => {
      e.preventDefault();
      this.clearMap();
      this.clearMarkers();
    });

    document.getElementById('route').addEventListener("click", e => {
      e.preventDefault();
      if (_.isEmpty(this.props.nodes) && _.isEmpty(this.props.coords) &&
        !(_.isEmpty(this.props.start.coords) && _.isEmpty(this.props.start.coords))) {
        window.alert("Please add a few pins first");
        return ;
      }
      else if (_.isEmpty(this.props.coords)) {
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
            this.props.setStart(route.start);
            this.props.setEnd(route.end);
            route.markers.forEach(marker => marker.setMap(this.props.map));
            route.start.marker.setMap(this.props.map);
            route.end.marker.setMap(this.props.map);
          } }>
          { route.name }
        </li>
      );
    });
  }

  clearMap() {
    this.props.directionsDisplay.setMap(null);
    document.getElementById('messages').innerHTML = "";
  }

  clearMarkers() {
    if (this.props.markers.length !== 0) {
      this.props.markers.forEach(marker => marker.setMap(null));
    }

    if (this.props.start.hasOwnProperty("marker")) {
      this.props.start.marker.setMap(null);
    }

    if (this.props.end.hasOwnProperty("marker")) {
      this.props.end.marker.setMap(null);
    }

    this.props.clearMarkers();
  }

  flipModal() {
    this.setState({ modal: !this.state.modal });
  }

  getDirections() {
    let directions = new google.maps.DirectionsService();
    let origin = _.isEmpty(this.props.start.coords) ? this.props.coords : this.props.start.coords;
    let destination = _.isEmpty(this.props.end.coords) ? this.props.coords : this.props.end.coords;

    directions.route({
      origin: origin,
      destination: destination,
      waypoints: this.props.nodes.map(node => ({ location: node, stopover: true })),
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, callback.bind(this));

    function callback(response, status) {
      if (status === "OK") {
        let time = 0;
        let history = {};
        let hours, minutes, seconds;
        let duration = "The trip should take about ";
        response.routes[0].legs = response.routes[0].legs.filter(leg => leg.distance.value > 0);
        console.log(response.routes[0].legs);
        response.routes[0].legs.forEach(leg => {
         time += leg.duration.value;
        });

        history.name = this.props.getHistoryName(response.routes[0].legs);
        history.markers = this.props.markers;
        history.start = this.props.start;
        history.end = this.props.end;
        hours = Math.floor(time / 3600);
        minutes = Math.floor(time / 60 % 60);
        seconds = Math.floor(time % 60);

        if (hours > 0){
          duration += `${hours.toString()} hours`;
        }
        if (minutes > 0){
          duration += (duration !== undefined ? ` ${minutes.toString()} minutes` : `${minutes.toString()} minutes`);
        }

        duration += (duration !== undefined ? ` ${seconds.toString()} seconds` : `${seconds.toString()} seconds`);

        this.props.addHistory(history);
        this.clearMarkers();

        document.getElementById('messages').innerHTML = duration;
        document.getElementById('messages').style.color = 'red';
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
        <button id="start" >Set Start</button>
        <button id="end" >Set End</button>
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
