import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Button = props => {
    const {faIcon, handler} = props;

    return(
        <button className="btn" type="button" onClick={handler}>
            <FontAwesomeIcon icon={faIcon} />
        </button>
    );
};

const IconButton = props => {
    const {faIcon, handler, isPrimary} = props;

    const classes = isPrimary ? 'icon-btn primary-icon-btn' : 'icon-btn';

    return(
        <button className={classes} type="button" onClick={handler}>
            <FontAwesomeIcon icon={faIcon} />
        </button>
    );
};


export {Button, IconButton};