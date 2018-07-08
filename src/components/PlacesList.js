import React from 'react';
import { connect } from 'react-redux';
import PlaceListItem from './PlaceListItem';
import { startRemovePlace } from '../actions/places';
import selectPlaces from '../selectors/places';

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
        places: selectPlaces(state.places, state.filters),
        map: state.map
    };
}

const mapDispatchToProps = (dispatch) => (
    { removePlace: ({ id }) => dispatch(startRemovePlace({ id })) }
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlacesList);