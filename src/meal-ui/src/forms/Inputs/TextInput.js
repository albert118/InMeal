import React from "react";

const TextInput = props => {
    const { className, name, label, value, placeholder, handler } = props;

    const classes = className ? `form-input ${className}` : `form-input`;

    return(
        <div className={className}>
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