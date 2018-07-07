import React from 'react';
import ReactDOM from 'react-dom';
import PopUpForm from './PopUpForm';
import ReactDOMServer from 'react-dom/server'

class Map extends React.Component {
  state = {
      addLocationInfowindow: undefined,
      showingMarkerInfoWindow: false,
      activeMarkerInfowindow: undefined,
      places: [
        {
          position: {lat: 59.329113196988345 , lng: 17.966015144369067 },
          title: 'first marker'
        },
        {
          position: {lat: 59.33564057873766 , lng: 18.086178108236254 },
          title: 'second marker'
        },
        {
          position: {lat: 59.311468551709524 , lng: 18.069698616048754 },
          title: 'third marker'
        }
      ]
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.google !== this.props.google) || (prevState.places !== this.state.places) ) {
      console.log('componentDidUpdate');
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

      this.renderMarkersOnMap();

      // pop up add place
      this.map.addListener('click', (e) => {
        this.closeOpenedInfoWindow();
        const popUp = <PopUpForm onSubmit={this.onSubmit}/>;
        const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        this.showPopupOnMap(position, popUp);
        google.maps.event.addListener(this.state.addLocationInfowindow, 'domready', () => {
          document.getElementById('popUp').addEventListener('submit', (e) => {
            e.preventDefault();
            this.state.places.push({
              position,
              title: e.target.elements.location.value
            });
            console.log(this.state.places);
            this.closeOpenedInfoWindow();
            this.renderMarkersOnMap();
          })
        });
      })
    }   
}

renderMarkersOnMap = () => {
  this.state.places.map((place) => {

    const marker = new google.maps.Marker({
      position: place.position,
      map: this.map,
      title: place.title
    });

    const markerInfowindow = new google.maps.InfoWindow({
      content: `<h5>${place.title}</h5>`
    });
    marker.addListener('click', () => {
      this.closeOpenedInfoWindow();
      this.setState({
        activeMarkerInfowindow: markerInfowindow
      })
      markerInfowindow.open(this.map, marker);
      // this.map.setCenter(place.position);
      // this.map.setZoom(13);
    });
  });
}

closeOpenedInfoWindow = () => {
  if(this.state.activeMarkerInfowindow){
    this.state.activeMarkerInfowindow.close();
  }
  if(this.state.addLocationInfowindow){
    this.state.addLocationInfowindow.close();
  }
}

showPopupOnMap = (position, popUp) => {
  const content = ReactDOMServer.renderToString(popUp)
  this.setState({
    addLocationInfowindow: new google.maps.InfoWindow({
      content,
      position
    })
  })
  this.state.addLocationInfowindow.open(this.map)
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