import React from 'react';
import { connect } from 'react-redux';
import PlaceListItem from './PlaceListItem';
import { startRemovePlace } from '../actions/places';
import { setActivePlace } from '../actions/activePlace';
import selectPlaces from '../selectors/places';

class PlacesList extends React.Component {
    render() {
        return(
            <div className='list'>
            {
                this.props.places.length === 0 ? (
                    <div>
                        <span>No Places Found</span>
                    </div>
                ) : (
                        this.props.places.map ( (place) => 
                            ( <PlaceListItem 
                                key={place.id} 
                                place={place}
                                setActivePlace={this.setActivePlace}
                                removePlace={this.removePlace} />
                            )   
                        )
                    )
            }
            </div>
        );
    }

    removePlace = (id) => {
        this.props.removePlace({ id })
    }
    
    setActivePlace = (place) => {
        this.props.setActivePlace(place)
    }
};

const mapStateToProps = (state) => {
    return {
        places: selectPlaces(state.places, state.filters),
        activePlace: state.activePlace
    };
}

const mapDispatchToProps = (dispatch) => (
    {
        removePlace: ({ id }) => dispatch(startRemovePlace({ id })),
        setActivePlace: (place) => dispatch(setActivePlace(place))
    }
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlacesList);