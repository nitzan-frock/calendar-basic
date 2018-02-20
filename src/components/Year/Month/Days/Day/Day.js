import React from 'react';
import classes from './Day.css';

const Day = (props) => {
    return (
        <div className={classes.Day}>
            <button 
                onClick={() => {props.showEvent(props.date)}}
                 >{props.date.day}</button>
        </div>
    );
};

export default Day;