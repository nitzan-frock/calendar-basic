import React from 'react';

const monthButtons = (props) => {
    return (
        <div>
            <button onClick={() => props.changeMonth('up')}>up</button>
            <button onClick={() => props.changeMonth('down')}>down</button>
        </div>
    );
};

export default monthButtons;