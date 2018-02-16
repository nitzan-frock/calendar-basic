import React from 'react';
import classes from './Day.css';

const Day = (props) => {
    return (
        <div className={classes.Day}>{props.day}</div>
    );
};

export default Day;