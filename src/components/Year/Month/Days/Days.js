import React from 'react';
import Day from '../Days/Day/Day';

const Days = (props) => {
    return props.days().map((day, index) => {
        return (
            <Day day={day.number} dayName={day.name} key={index} />
        );
    });
};

export default Days;