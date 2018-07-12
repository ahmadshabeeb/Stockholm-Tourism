import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
import LoadingPage from './LoadingPage';

const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

export class MapContainer extends React.Component {

  onMarkerClicked = (e) => {
    this.setState({
      showingInfoWindow: true
    })
  }

  render() {
    if (!this.props.loaded) {
      return <LoadingPage />
    }
    return (
      <div className='map-container'>
          <Map google={this.props.google} />
      </div>
    )
  }
}
  
export default GoogleApiWrapper({
  apiKey: googleMapsApiKey
})(MapContainer)