import React from 'react';
import { API_KEY } from '../../ApiKey';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import LoadingPage from './LoadingPage';

export class MapContainer extends React.Component {
    render() {
      if (!this.props.loaded) {
        return <LoadingPage />
      }

      return (
        <div className="map-container">
            <Map google={this.props.google} />
        </div>
      )
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: API_KEY
  })(MapContainer)