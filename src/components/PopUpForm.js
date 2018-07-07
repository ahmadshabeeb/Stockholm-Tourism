import React from 'react';

class PopUpForm extends React.Component {
    render() {
        return (
            <form id='popUp' className='map-form'>
                <b>Add this location</b><br />
                <input type='text' name='location' />
                <button id='btn'>Add</button>
            </form>
        );
    }
}

export default PopUpForm;