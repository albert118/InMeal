import React from "react";

const TextInput = props => {
    const { label, value, placeholder, handler } = props;

    return(
        <div className="form-input">
            <label htmlFor={label}>{label}</label>
            <input 
                id={label} 
                className="text-input"
                key={label} 
                value={value}
                placeholder={placeholder} 
                onChange={handler}
                type="text" 
            />
        </div>
    );
};


export { TextInput };