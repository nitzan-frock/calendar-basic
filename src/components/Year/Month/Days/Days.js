import React from 'react';
import Day from '../Days/Day/Day';
import classes from './Days.css';

const Days = (props) => {
    let allDays = [];
    let prev = props.days.prev.map((day, index) => {
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
    return allDays;
};

export default Days;