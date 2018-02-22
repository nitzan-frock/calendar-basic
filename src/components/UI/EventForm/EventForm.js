import React from 'react';

const EventForm = (props) => {

    return (
        <div>
            Event: 
            <input 
                type="text" 
                name=""
                value={props.value}
                placeholder="Add New Event"
                onChange={event => props.eventChanged(event)} 
                onKeyPress={props.enterPressed}/>
            <button onClick={props.eventAdded} >Add Event</button>
        </div> 
    );
};

export default EventForm;