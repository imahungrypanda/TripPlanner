import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './util/store';
import './index.css';
import Map from './map/MapContainer';
import { Provider } from 'react-redux';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.store = store;

  const Root = ({store}) => (
    <Provider store={ store }>
      <Map />
    </Provider>
  );

  ReactDOM.render(<Root store={ store } />, document.getElementById('root'));
});
