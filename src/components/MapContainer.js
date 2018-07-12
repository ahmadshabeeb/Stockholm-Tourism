import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import LoadingPage from './LoadingPage';

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

export class MapContainer extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <LoadingPage />
    }
    return (
      <div>
          <Map google={this.props.google} />
      </div>
    )
  }
}
  
export default GoogleApiWrapper({
  apiKey: googleMapsApiKey
})(MapContainer)