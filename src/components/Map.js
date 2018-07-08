import React from 'react';
import ReactDOM from 'react-dom';
import PopUpForm from './PopUpForm';
import ReactDOMServer from 'react-dom/server'
import { connect } from 'react-redux';
import { startAddPlace } from '../actions/places';
import { setMap } from '../actions/activePlace';
import selectPlaces from '../selectors/places';

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
      this.zoomInForActivePlace(this.props.activePlace);
      this.showInfoWindowForActivePlace(this.props.activePlace);
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
}

clearMarkers = () => {
  if(this.state.markers) {
    this.state.markers.map((marker) => {
      marker.setMap(null);
    })
  }
  this.setState({ markers: [] });
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

      const markerInfowindow = new google.maps.InfoWindow({
        content: `<h5>${place.title}</h5>`
      });

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

closeOpenedInfoWindow = () => {
  console.log(this)
  if(this.state.activeMarkerInfowindow){
    this.state.activeMarkerInfowindow.close();
  }
  if(this.state.addLocationInfowindow){
    this.state.addLocationInfowindow.close();
  }
}

showInfoWindowForActivePlace = (place) => {
  const matchedMarkers = this.state.markers.filter((marker) => {
    return (marker.position.lat() === place.position.lat) && (marker.position.lng() === place.position.lng) && (marker.title === place.title)
  })
  const activeMarker = matchedMarkers[0];
  if(activeMarker) {
    this.closeOpenedInfoWindow();
    const markerInfowindow = new google.maps.InfoWindow({
      content: `<h5>${activeMarker.title}</h5>`
    });
    console.log(activeMarker)
    this.setState({ activeMarkerInfowindow: markerInfowindow });
    markerInfowindow.open(this.map, activeMarker);
  }
}

zoomInForActivePlace = (place) => {
  this.map.setCenter(place.position);
  this.map.setZoom(13);
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
      <div>
        <div  ref="map" style={style}>
          loading map...
        </div>
        <button onClick={this.showInfoWindowForActivePlace} > active place</button>
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