import React from 'react';

export const AnimatedHamburger = props => {
    const { callback } = props;

    return (
        <div className='hamburger' onClick={callback}>
            <div className='line1'></div>
            <div className='line2'></div>
            <div className='line3'></div>
        </div>
    );
};
