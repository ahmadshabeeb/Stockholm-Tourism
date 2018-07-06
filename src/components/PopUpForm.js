import React from 'react';

class PopUpForm extends React.Component {
    state = {
        print: "before"
    }
    onSubmit = (e) => {
        window.alert('after')
        e.preventDefault();
        this.state.print = "after"
    }

    render() {
        return (
            <div>
                <b>Add this location</b><br />
                <form ref='mapform' className='map-form' onSubmit={this.onSubmit}>
                    <input type='text' />
                    <button id='btn'>Add</button>
                </form>
            </div>
        );
    }
}

export default PopUpForm;