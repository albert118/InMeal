import React from "react";

/// label should be unique
const Checkbox = props => {
    const { label, value } = props

    return (
        <div className="form-input">
            <input type="checkbox" id={label} key={label} value={value} />
            <label for={label}>{label}</label>
        </div>
    );
};

export default Checkbox;
