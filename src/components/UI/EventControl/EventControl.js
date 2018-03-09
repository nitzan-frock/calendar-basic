import React from 'react';
import classes from './EventControl.css';

const DELETE_ICON_SRC = "https://vignette.wikia.nocookie.net/timmypedia/images/1/1f/Red-X-in-circle.png/revision/latest?cb=20160924072833";

const EventControl = (props) => {
    return (
        <div className={classes.Wrapper}>
            <div className={classes.Delete} onClick={() => props.clicked(props.eventKey)}>
                <img src={DELETE_ICON_SRC} alt="delete" />
            </div>
        </div>
    );
};

export default EventControl;