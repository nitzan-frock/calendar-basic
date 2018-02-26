import React from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const moment = require('moment');

const events = (props) => {
    // define date clicked for the event
    const year = props.date.year;
    const month = moment().month(props.date.month).format('MMMM');
    const date = props.date.day;
    const compiledDate = month+"-"+date+"-"+year;
    const weekDayName = moment(compiledDate, "MMMM-DD-YYYY").format('dddd');

    let eventDate = (+moment().month(props.date.month).format('MM'))+"-"+date+"-"+year;

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
            <h3>{weekDayName}, {month} {date}, {year}</h3> 
            {displayEvents}
            {props.children}
        </Auxiliary>
    );
};

export default events;