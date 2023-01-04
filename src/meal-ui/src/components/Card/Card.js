import React from 'react';


const Card = props =>  {
    const { className, title } = props;

    const classes = className ? `card ${className}` : `carousel`;

    return (
        <div className={classes}>
            <div className="title-bar">
                <h2 className="title">{title}</h2>
            </div>
            <div className="content-slot">
                {props.children}
            </div>
        </div>
    );
};

export default Card;