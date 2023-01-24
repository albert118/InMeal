import React from "react";


const SaveButton = props => {
    const { className, handler } = props;

    const classes = className 
        ? `btn save-btn ${className}` 
        : `btn save-btn`;

        return (
            <button className={classes} type="submit" onClick={handler}>
                { props.children ?? "Save" }
            </button>
        );
};


export default SaveButton;