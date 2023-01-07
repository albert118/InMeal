import React from "react";


const LongTextInput = props => {
    const { name, label, value, placeholder, handler } = props;

    return(
        <div className="form-input">
            {/* <label htmlFor={label}>{label}</label> */}
            <textarea 
                id={label} 
                className="long-text-input scrollbar-vertical"
                name={name} 
                value={value}
                placeholder={placeholder} 
                onChange={handler}
                cols="60"
                rows="4"
            />
        </div>
    );
};

export { LongTextInput };