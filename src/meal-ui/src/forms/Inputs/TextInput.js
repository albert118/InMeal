import React from "react";

const TextInput = props => {
    const { name, label, value, placeholder, handler } = props;

    return(
        <div className="form-input">
            { label ?? <label htmlFor={label}>{label}</label> }
            <input 
                id={label ?? "generic-text-input-id"} 
                className="text-input"
                name={name} 
                value={value}
                placeholder={placeholder} 
                onChange={handler}
                type="text" 
            />
        </div>
    );
};


export { TextInput };