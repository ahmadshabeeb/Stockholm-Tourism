import React from 'react';
import ReactDOM from 'react-dom';
import PopUpForm from './PopUpForm';
import ReactDOMServer from 'react-dom/server'
import { connect } from 'react-redux';
import { startAddPlace } from '../actions/places';
import selectPlaces from '../selectors/places';
import MarkerInfoWindow from './MarkerInfoWindow';

class Map extends React.Component {
  state = {
      addLocationInfowindow: undefined,
      activeMarkerInfowindow: undefined,
      markers: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google){
      this.loadMap();
    }

    if(prevProps.places !== this.props.places) {
      this.renderMarkersOnMap();
      this.closeOpenedInfoWindow();
    }

    if(prevProps.activePlace !== this.props.activePlace) {
      this.zoomInForActivePlace(this.props.activePlace.place);
      this.showInfoWindowForActivePlace(this.props.activePlace.place);
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      this.renderMap();
      this.renderMarkersOnMap();
      this.onMapClicked();
    }   
}

renderMap = () => {
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
}

renderMarkersOnMap = () => {
  this.clearMarkers();
  let markers = [];
    this.props.places.map((place) => {

      const marker = new google.maps.Marker({
        position: place.position,
        map: this.map,
        title: place.title
      });

      markers.push(marker);

      const markerInfowindow = this.createMarkerInfoWindow(place.title);

      marker.addListener('click', () => {
        this.closeOpenedInfoWindow();
        this.setState({
          activeMarkerInfowindow: markerInfowindow
        })
        markerInfowindow.open(this.map, marker);
      });
  });

  this.setState({ markers });
}

onMapClicked = () => {
  this.map.addListener('click', (e) => {
    this.closeOpenedInfoWindow();
    const popUp = <PopUpForm />;
    const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    this.showPopupOnMap(position, popUp);

    google.maps.event.addListener(this.state.addLocationInfowindow, 'domready', () => {
      document.getElementById('popUp').addEventListener('submit', (e) => {
        e.preventDefault();
        this.props.startAddPlace({
          position,
          title: e.target.elements.location.value
        });
        this.closeOpenedInfoWindow();
        this.renderMarkersOnMap();
      })
    });
  })
}

clearMarkers = () => {
  if(this.state.markers) {
    this.state.markers.map((marker) => {
      marker.setMap(null);
    })
  }
  this.setState({ markers: [] });
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

zoomInForActivePlace = (place) => {
  this.map.setCenter(place.position);
  this.map.setZoom(13);
}

showInfoWindowForActivePlace = (place) => {
  const matchedMarkers = this.state.markers.filter((marker) => {
    return (marker.position.lat() === place.position.lat) && (marker.position.lng() === place.position.lng) && (marker.title === place.title)
  })
  const activeMarker = matchedMarkers[0];
  if(activeMarker) {
    this.closeOpenedInfoWindow();
    const markerInfowindow = this.createMarkerInfoWindow(activeMarker.title);
    this.setState({ activeMarkerInfowindow: markerInfowindow });
    markerInfowindow.open(this.map, activeMarker);
  }
}

createMarkerInfoWindow = (title) => {
  const content = ReactDOMServer.renderToString(<MarkerInfoWindow title={title} />)
  return new google.maps.InfoWindow({
    content
  });
}

render() {
    const style = {
      width: '77.5vw',
      height: '89vh'
    }
    return (
        <div  ref="map" style={style} >
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

const mapStateToProps = (state) => {
  return {
      places: selectPlaces(state.places, state.filters),
      activePlace: state.activePlace
  };
};

const mapDispatchToProps = (dispatch) => (
  { startAddPlace: (place) => dispatch(startAddPlace(place)) }
);

export default connect(mapStateToProps, mapDispatchToProps)(Map);