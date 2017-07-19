import React from 'react';
import Provider from 'react-redux';
import Map from '../map/Map';

// class Home extends React.Component {

//   render() {
//     return (
//       <Provider store={ store } >
//         <Map />
//       </Provider >
//     )
//   }
// }


const Home = ({store}) => {
  return(
    <Provider >
      <Map />
    </Provider>
  );
}
export default Home;