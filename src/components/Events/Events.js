import React from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const moment = require('moment');

const events = (props) => {
    const year = props.date.year;
    const month = moment().month(props.date.month).format('MMMM');
    const date = props.date.day;
    const compiledDate = month+"-"+date+"-"+year;
    const weekDayName = moment(compiledDate, "MMMM-DD-YYYY").format('dddd');
    return (
        <Auxiliary>
            <h3>Add New Event</h3>
            <p>{weekDayName}, {month} {date}, {year}</p> 
            <input type="text" />
        </Auxiliary>
    );
};

export default events;