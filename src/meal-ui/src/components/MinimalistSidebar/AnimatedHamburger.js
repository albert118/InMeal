import React, { useState } from 'react';

export const AnimatedHamburger = props => {
    const { callback } = props;

    const [isActive, setActive] = useState(false);

    const handleClick = event => {
        event.preventDefault();
        setActive(!isActive);
        callback();
    };

    return (
        <div className={`hamburger ${isActive ? "hamburger-toggle": ""}`} onClick={handleClick}>
            <div className='line1'></div>
            <div className='line2'></div>
            <div className='line3'></div>
        </div>
    );
};
