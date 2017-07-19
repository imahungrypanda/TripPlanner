import React from 'react';
import './Buttons.css';

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    document.getElementById('clear').addEventListener("click", e => {
      e.preventDefault();
      this.props.clearMarkers();
      console.log("clear");
    })
  }

  render() {
    console.log(this.props);
    return(
      <div id="buttons">
        <button id="clear" >Clear</button>
        <button id="route">Find best route</button>
        <button id="history">History</button>
      </div>
    )
  }
}

export default Buttons;