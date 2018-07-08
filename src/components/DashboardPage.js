import React from 'react';
import MapContainer from './MapContainer';
import PlacesList from './PlacesList';
import PlacesListFilters from './PlacesListFilters';

const DashboardPage = () => (
  <div>
    <MapContainer />
    <PlacesListFilters />
    <PlacesList />
  </div>
);

export default DashboardPage;
