import React from 'react';
import MapContainer from './MapContainer';
import List from './List';

const DashboardPage = () => (
  <div className='dashboard'>
    <div className='dashboard-container'>
      <List /> 
      <MapContainer />
    </div>
  </div>
);
export default DashboardPage;
