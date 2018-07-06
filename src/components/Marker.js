import React from 'react';

export class Marker extends React.Component {
    componentDidUpdate(prevProps, prevState){
        console.log('MarkerDidUpdate');
        if ((this.props.map !== prevProps.map) ||
          (this.props.position !== prevProps.position)) {
            this.renderMarker();
        }
    }

    renderMarker() {
    console.log('renderMarker');
      let {
        map, google, position
      } = this.props;
      console.log(map);
      const pref = {
        map,
        position
      };
      this.marker = new google.maps.Marker(pref);
    }

    render() {
        console.log('Marker render');
        return null;
    }
}

export default Marker;