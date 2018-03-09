import React from 'react';
import classes from './EventControl.css';

const EventControl = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Delete} onClick={() => props.clicked(props.eventKey)}>
                Delete
            </div>
        </div>
    );
};

export default EventControl;