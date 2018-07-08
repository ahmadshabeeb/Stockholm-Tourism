import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter } from '../actions/filters';

class PlacesListFilters extends React.Component {
    onTextChange = (e) =>  {
        this.props.setTextFilter(e.target.value);
    }

    render() {
        return(
            <div>
            <input className="text-input"
                placeholder="search places"
                type="text" 
                defaultValue={this.props.filters.text} 
                onChange={this.onTextChange}
        />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesListFilters);