import React from 'react';
import { Provider } from 'react-redux';
import Map from '../map/MapContainer';

const Home = ({store}) => {
  return(
    <Provider store={ store }>
      <Map />
    </Provider>
  );
}

export default Home;