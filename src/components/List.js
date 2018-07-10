import React from 'react';
import PlacesList from './PlacesList';
import PlacesListFilters from './PlacesListFilters';

const List = () => {
    return (
        <div className='main'>
            <p className='list-header'>My Places</p>
            <PlacesListFilters />
            <PlacesList />
        </div>
    );
}

export default List;