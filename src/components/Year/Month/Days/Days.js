import React from 'react';
import Day from '../Days/Day/Day';

const days = (props) => {
    let allDays = [];
    let prev = props.days.prev.map((day, index) => {
        return (
            <Day day={day.day} key={day.key} />
        );
    });
    let current = props.days.current.map(day => {
        return (
            <Day day={day.day} key={day.key} />
        );
    });
    let next = props.days.next.map(day => {
        return (
            <Day day={day.day} key={day.key} />
        );
    });

    allDays.push(prev, current, next);
    return allDays;
};

export default days;