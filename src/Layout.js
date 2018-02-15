import React from 'react';
import classes from './Layout.css';
import App from './containers/App';

const Layout = () => {
    return (
        <div className={classes.Wrapper}>
            <App />
        </div>
    );
};

export default Layout;