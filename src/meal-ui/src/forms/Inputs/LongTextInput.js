import React from "react";


const LongTextInput = props => {
    const { label, value, placeholder, handler } = props;

    return(
        <div className="form-input">
            <label htmlFor={label}>{label}</label>
            <textarea 
                id={label} 
                className="long-text-input"
                name={label} 
                value={value}
                placeholder={placeholder} 
                onChange={handler}
            />
        </div>
    );
};

export { LongTextInput };