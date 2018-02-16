import React from 'react';
import classes from './Day.css';

const Day = (props) => {
    return (
        <div className={classes.Day}>
            <button>{props.day}</button>
        </div>
    );
};

export default Day;