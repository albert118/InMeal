import React from "react";


const LongTextInput = props => {
    const { name, label, value, placeholder, handler } = props;

    return(
        <div className="form-input">
            { label ?? <label htmlFor={label}>{label}</label> }
            <textarea 
                id={label ?? "generic-long-text-input-id"} 
                className="long-text-input scrollbar-vertical"
                name={name} 
                value={value}
                placeholder={placeholder} 
                onChange={handler}
                rows="6"
            />
        </div>
    );
};

export { LongTextInput };