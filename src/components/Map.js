import React from 'react';
import ReactDOM from 'react-dom';

class Map extends React.Component {
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
    
          let zoom = 11;
          let lat = 59.3293;
          let lng = 18.0686;
          const center = new maps.LatLng(lat, lng);
          const mapConfig = Object.assign({}, {
            center: center,
            zoom: zoom
          })
          this.map = new maps.Map(node, mapConfig);
        }
    }

    render() {
        const style = {
          width: '70vw',
          height: '70vh'
        }
    
        return (
          <div ref="map" style={style}>
            loading map...
          </div>
        )
      }
};

export default Map;