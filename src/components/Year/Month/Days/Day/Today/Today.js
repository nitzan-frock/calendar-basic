import React from 'react';
import getToday from './getToday';
import classes from './Today.css';

const Today = (props) => {
    const today = getToday(props.date);
    return (
        <p className={classes.Today} onClick={props.clicked}>{today.compiledString}</p>
    );
};

export default Today;