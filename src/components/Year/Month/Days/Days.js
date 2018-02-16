import React from 'react';
import Day from '../Days/Day/Day';
import classes from './Days.css';

const Days = (props) => {
    console.log("IN DAYS");
    let allDays = [];
    let prev = props.days.prev.map((day, index) => {
        console.log(day.day);
        return (
            <div className={classes.Day}>
                <Day day={day.day} key={day.key} />
            </div>
        );
    });
    let current = props.days.current.map(day => {
        return (
            <div className={classes.Day}>
                <Day day={day.day} key={day.key} />
            </div>
        );
    });
    let next = props.days.next.map(day => {
        return (
            <div className={classes.Day}>
                <Day day={day.day} key={day.key} />
            </div>
        );
    });

    allDays.push(prev, current, next);
    console.log(allDays);
    return allDays;
};

export default Days;