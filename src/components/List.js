import React from 'react';
import PlacesList from './PlacesList';
import PlacesListFilters from './PlacesListFilters';

const List = () => {
    return (
        <div className='main'>
            <p className='main__title'>My Places</p>
            <PlacesListFilters className='main__filter'/>
            <PlacesList className='main__list' />
    </div>
    );
}

export default List;