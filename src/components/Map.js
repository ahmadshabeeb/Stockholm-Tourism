import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {
  state = {
      infowindow: new google.maps.InfoWindow({})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      const zoom = this.props.zoom;
      const lat = this.props.initialCenter.lat;
      const lng = this.props.initialCenter.lng;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center,
        zoom
      })
      this.map = new maps.Map(node, mapConfig);

      const marker1 = new google.maps.Marker({
        position: {lat: 59.329113196988345 , lng: 17.966015144369067},
        map: this.map
      });

      const marker2 = new google.maps.Marker({
        position: {lat: 59.3407209390951 , lng: 18.18093518831438},
        map: this.map
      });

      this.map.addListener('click', (e) => {
        this.state.infowindow.close();
        this.showPopupOnMap(e.latLng);
      })



      const latlng =  new google.maps.LatLng(59.311309560216216, 18.06518750637474);
      const  pos = {lat: 59.311309560216216, lng: 18.06518750637474};
      

    }
}

showPopupOnMap = (latLng) => {
  const contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<p>I am here ma man</p>'+
  '</div>'+
  '</div>';
  const pos = { lat: latLng.lat(), lng: latLng.lng() };
  this.state.infowindow = new google.maps.InfoWindow({
    content: contentString,
    position: pos
  });
  this.state.infowindow.open(this.map)
}

render() {
    const style = {
      width: '70vw',
      height: '70vh'
    }

    return (
      <div  ref="map" style={style}>
        loading map...
      </div>
    )
  }
};

Map.defaultProps = {
  zoom: 11,
  initialCenter: {
    lat: 59.3293,
    lng: 18.0686
  }
}

export default Map;