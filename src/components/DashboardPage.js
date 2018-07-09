import React from 'react';
import MapContainer from './MapContainer';
import List from './List';


const DashboardPage = () => (
  <div className='dashboard-container'>
    <div className='dashboard-container__list'>
      <List /> 
    </div>
    <div className='dashboard-container__map-container'>
      <MapContainer />
    </div>
  </div>
);
export default DashboardPage;
