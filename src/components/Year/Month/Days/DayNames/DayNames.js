import React from 'react';
import classes from './DayNames.css';

const DayNames = (props) => {
    return props.names.map((name, index) => {
        return <div className={name} key={index} >{name}</div>
    });
};

export default DayNames;