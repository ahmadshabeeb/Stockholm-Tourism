import React from 'react';
import { API_KEY } from '../../ApiKey';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import LoadingPage from './LoadingPage';
import Marker from './Marker';

export class MapContainer extends React.Component {
    render() {
      if (!this.props.loaded) {
        return <LoadingPage />
      }
      const pos = {lat: 59.329113196988345 , lng: 17.966015144369067};
      return (
        <div className="map-container">
            <Map google={this.props.google} >
              <Marker position={pos} />
            </Map>
        </div>
      )
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: API_KEY
  })(MapContainer)