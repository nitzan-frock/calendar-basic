import React from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import getToday from '../Year/Month/Days/Day/Today/getToday';

const moment = require('moment');

const events = (props) => {
    // define date clicked for the event
    const dateObj = getToday(props.date);

    let eventDate = (+moment().month(dateObj.month).format('MM'))+"-"+dateObj.day+"-"+dateObj.year;

    let displayEvents = <p>No Events.</p>

    if (props.events.length > 0) {
        props.events.map(date => {
            const existingEventDate = date.date;
            if (existingEventDate === eventDate) {
                displayEvents = date.events.map(event => {
                    return (<p key={event.key}>- {event.event}</p>);
                });
                return displayEvents
            } else {
                return null;
            }
        });
    }
    
    return (
        <Auxiliary>
            <h2>Events</h2>
            <h3>{dateObj.compiledString}</h3> 
            {displayEvents}
            {props.children}
        </Auxiliary>
    );
};

export default events;