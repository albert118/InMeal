import React from "react";


const LongTextInput = props => {
    const { className, name, label, value, placeholder, handler } = props;

    const classes = className ? `form-input ${className}` : `form-input`;

    return(
        <div className={classes}>
            { label ?? <label htmlFor={label}>{label}</label> }
            <textarea 
                id={label ?? "generic-long-text-input-id"} 
                className="long-text-input scrollbar-vertical"
                name={name} 
                value={value}
                placeholder={placeholder} 
                onChange={handler}
                rows="4"
            />
        </div>
    );
};

export { LongTextInput };