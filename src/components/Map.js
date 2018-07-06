import React from 'react';
import ReactDOM from 'react-dom';
import PopUpForm from './PopUpForm';
import ReactDOMServer from 'react-dom/server'

class Map extends React.Component {
  
  state = {
      infowindow: new google.maps.InfoWindow({}),
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.loadMap();
  }

  loadMap() {
    console.log('loadMap');
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

      this.map.addListener('click', (e) => {
        this.state.infowindow.close();
        const popUp = <PopUpForm />;
        this.showPopupOnMap(e.latLng, popUp);
        google.maps.event.addListener(this.state.infowindow, 'domready', () => {
           // the form
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

renderChildren() {
  console.log('renderChildren');
  const {children} = this.props;
  if (!children) return;
  return React.Children.map(children, c => {
    return React.cloneElement(c, {
      map: this.map,
      google: this.props.google,
    });
  })
}

render() {
  console.log('render');
    const style = {
      width: '70vw',
      height: '70vh'
    }

    return (
      <div  ref="map" style={style}>
        loading map...
        {this.renderChildren()}
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