import React from 'react';
import ReactDOM from 'react-dom';
import PopUpForm from './PopUpForm';
import ReactDOMServer from 'react-dom/server'

class Map extends React.Component {
  state = {
      infowindow: new google.maps.InfoWindow({}),
      showingInfoWindow: false,
      activeMarker: {},
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

      const {initialCenter, zoom} = this.props;
      const {lat, lng} = initialCenter;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center,
        zoom
      })
      this.map = new maps.Map(node, mapConfig);

      // adding markers for corresponding saved places
      const pos = {lat: 59.329113196988345 , lng: 17.966015144369067};
      const marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'first marker',
      });
      const infowindow = new google.maps.InfoWindow({
        content: `<h3>${marker.title}</h3>`
      });
      marker.addListener('click', () => {
        infowindow.open(this.map, marker);
      });

      // pop up add place
      this.map.addListener('click', (e) => {
        this.state.infowindow.close();
        const popUp = <PopUpForm onSubmit={this.onSubmit}/>;
        this.showPopupOnMap(e.latLng, popUp);
        google.maps.event.addListener(this.state.infowindow, 'domready', () => {
          const formNode = ReactDOM.findDOMNode(this.refs.popUp);
          document.getElementById('popUp').addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(e.target.elements.location.value);
          })
        });
      })
      this.forceUpdate();
    } 
    
}

showPopupOnMap = (latLng, popUp) => {
  const contentString = ReactDOMServer.renderToString(popUp)

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