import React from 'react';

class PopUpForm extends React.Component {
    render() {
        return (
            <form id='popUp' className='form'>
                <input type='text' 
                        name='location' 
                        className='form__text-input'
                        placeholder='Name'/>
                <button id='btn' className='button button--save'>Save</button>
            </form>
        );
    }
}

export default PopUpForm;