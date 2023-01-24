import TitleBar from 'components/TitleBar/TitleBar';
import React from 'react';


const Card = props =>  {
    const { className, title } = props;

    const classes = className ? `card ${className}` : `card`;

    return (
        <div className={classes}>
            <TitleBar>
                {title}
            </TitleBar>
            <div className="content-slot">
                {props.children}
            </div>
        </div>
    );
};

export default Card;