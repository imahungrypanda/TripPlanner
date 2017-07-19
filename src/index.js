import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './util/store';
import './index.css';
import Home from './home/Home';
import { Provider } from 'react-redux';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.store = store;

  const Root = ({store}) => (
    <Provider store={ store }>
      <Home />
    </Provider>
  );


  ReactDOM.render(<Root store={ store } />, document.getElementById('root'));
});

