import React from 'react';
import PlacesList from './PlacesList';
import PlacesListFilters from './PlacesListFilters';

const List = () => {
    return (
        <div className='main'>
            <PlacesListFilters />
            <PlacesList />
        </div>
    );
}

export default List;