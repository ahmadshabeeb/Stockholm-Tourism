import React from 'react';

const MarkerInfoWindow = ({ title }) => {
    return (
        <div className='marker-info-window-wrapper'>
            <p className='marker-info-window'><b>{title}</b></p>
        </div>
    );
}

export default MarkerInfoWindow;