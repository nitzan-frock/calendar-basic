import React from 'react';
import Day from '../Days/Day/Day';

const days = (props) => {
    let consolidatedDays = Object.keys(props.days)
    .map(dayType => {
        return (props.days[dayType].map((day) => {
            return (
                <Day 
                    showEvent={props.showEvent} 
                    currentDate={props.currentDate}
                    date={day} 
                    key={day.key} />
            );
        }));
    });

    return consolidatedDays;
};

export default days;