import React from 'react';

const monthButtons = (props) => {
    return (
        <div>
            <button onClick={() => props.changeMonth('up')}>up</button>
            <button >down</button>
        </div>
    );
};

export default monthButtons;