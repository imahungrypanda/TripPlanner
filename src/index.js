import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './util/store';
import './index.css';
import Home from './home/Home';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.store = store;
  ReactDOM.render(<Home store={ store } />, document.getElementById('root'));
});

