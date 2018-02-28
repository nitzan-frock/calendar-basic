import React from 'react';
import classes from './MonthButtons.css';

const monthButtons = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Up} onClick={() => props.changeMonth('up')} ></div>
            <div className={classes.Down} onClick={() => props.changeMonth('down')}></div>
        </div>
    );
};

export default monthButtons;