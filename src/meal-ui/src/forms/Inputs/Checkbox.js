import React from "react";

/// label should be unique
const Checkbox = props => {
    const { name, label, value } = props

    return (
        <div className="form-input">
            <input type="checkbox" id={label} value={value} name={name} />
            <label htmlFor={label}>{label}</label>
        </div>
    );
};

export default Checkbox;
