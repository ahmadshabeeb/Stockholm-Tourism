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
            <div className='list-item'>
                <div onClick={this.clickEventHandler} className="list-item-data">
                    <h3 className="list-item-data__title"
                    >{this.props.place.title}</h3>
                </div>
                <button onClick={this.removePlace} className='button button--remove'>REMOVE</button>
            </div>
        )
    }
}
export default PlaceListItem;