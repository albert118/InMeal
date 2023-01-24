import React from "react";


const CancelButton = props => {
    const { className, handler } = props;

    const classes = className 
        ? `btn cancel-btn ${className}` 
        : `btn cancel-btn`;

        return (
            <button className={classes} type="button" onClick={handler}>
                { props.children ?? "Cancel" }
            </button>
        );
};


export default CancelButton;