import React from 'react';
import classes from './Day.css';

const Day = (props) => {
    let currentDay = null;
    let currentStyle = [classes.Day];

    if (props.currentDate.month === props.actualCurrentDate.month && 
        props.date.day === +props.actualCurrentDate.day &&
        props.month === 'current') {

        currentDay = (
            <div className={classes.Current}>
                <p style={{color: 'white'}}>{props.date.day}</p>
            </div>
        );
    }

    let dayStyle = {color: 'black'};
    if (props.month !== 'current') {
        dayStyle = {color: 'gray'};
    }

    return (
        <div className={currentStyle} onClick={() => {props.showEvent(props.date)}}>
            {!currentDay ? <p style={dayStyle}>{props.date.day}</p> : currentDay}
        </div>
    );
};

export default Day;