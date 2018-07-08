import React from 'react';

class PlaceListItem extends React.Component {
    clickEventHandler = () => {
        this.props.setActivePlace(this.props.place);
    }

    removePlace = () => {
        this.props.removePlace(this.props.place.id)
    }

    render() {
        return (
            <div>
                <h3 className="list-item__data"
                onClick={this.clickEventHandler}
            >{this.props.place.title}</h3>
            <button onClick={this.removePlace}>Remove</button>
    </div>
        )
    }
}
export default PlaceListItem;