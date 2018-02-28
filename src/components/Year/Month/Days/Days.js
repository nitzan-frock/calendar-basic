import React from 'react';
import Day from '../Days/Day/Day';

const days = (props) => {
    let consolidatedDays = Object.keys(props.days)
    .map(monthType => {
        return (props.days[monthType].map((day) => {
            return (
                <Day 
                    showEvent={props.showEvent} 
                    actualCurrentDate={props.actualCurrentDate}
                    currentDate={props.currentDate}
                    date={day} 
                    month={monthType}
                    key={day.key} />
            );
        }));
    });

    return consolidatedDays;
};

export default days;