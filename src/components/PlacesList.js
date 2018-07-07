import React from 'react';
import { connect } from 'react-redux';
import PlaceListItem from './PlaceListItem';
import { startRemovePlace } from '../actions/places';

class PlacesList extends React.Component {
    render() {
        return(
            <div>
            {
                this.props.places.length === 0 ? (
                    <div>
                        <span>No Places</span>
                    </div>
                ) : (
                        this.props.places.map ( (place) => 
                            ( <PlaceListItem key={place.id} {...place}
                                    map={this.props.map}
                                    removePlace={this.removePlace}/> )   
                        )
                    )
            }
            </div>
        );
    }

    removePlace = (id) => {
        this.props.removePlace({ id })
    }
};

const mapStateToProps = (state) => {
    return {
        places: state.places,
        map: state.map
    };
}

const mapDispatchToProps = (dispatch) => (
    { removePlace: (place) => dispatch(startRemovePlace(place)) }
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlacesList);