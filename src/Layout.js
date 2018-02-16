import React from 'react';
import classes from './Layout.css';
import Calendar from './containers/Calendar';

const Layout = () => {
    return (
        <div className={classes.Wrapper}>
            <Calendar />
        </div>
    );
};

export default Layout;