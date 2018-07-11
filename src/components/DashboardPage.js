import React from 'react';
import MapContainer from './MapContainer';
import List from './List';

const DashboardPage = () => (
    <div className='dashboard-container'>
      <List /> 
      <MapContainer />
    </div>
);
export default DashboardPage;
