import React from 'react';

class PlaceListItem extends React.Component {
    clickEventHandler = () => {
        if(this.props.map){
            this.props.map.setCenter(this.props.position);
            this.props.map.setZoom(13);
        }
    }

    removePlace = () => {
        this.props.removePlace(this.props.id)
    }

    render() {
        return (
            <div>
                <h3 className="list-item__data"
                onClick={this.clickEventHandler}
            >{this.props.title}</h3>
            <button onClick={this.removePlace}>Remove</button>
    </div>
        )
    }
}
export default PlaceListItem;