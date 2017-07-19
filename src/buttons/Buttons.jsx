import React from 'react';
import './Buttons.css';

class Buttons extends React.Component {
  render() {
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