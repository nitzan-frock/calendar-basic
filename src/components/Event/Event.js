import React from 'react';

import classes from './Event.css';
import EventControl from '../UI/EventControl/EventControl';

const Event = (props) => {
    return (
        <div className={classes.Container}>
            <p className={classes.Event}>- {props.event}</p>
            <EventControl eventKey={props.controlKey} clicked={props.eventControlClicked} />
        </div>
    );
};

export default Event;