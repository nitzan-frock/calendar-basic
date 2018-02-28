import React from 'react';
import classes from './Day.css';

const Day = (props) => {
    return (
        <div className={classes.Day} onClick={() => {props.showEvent(props.date)}}>
            <p>{props.date.day}</p>
        </div>
    );
};

export default Day;