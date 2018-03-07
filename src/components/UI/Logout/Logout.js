import React from 'react';
import classes from './Logout.css';

const Logout = (props) => {
    return (
        <button 
            className={classes.Logout} 
            onClick={props.logoutClicked} >
            Logout
        </button>
    );
};

export default Logout;