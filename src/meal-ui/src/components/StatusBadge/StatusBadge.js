import React from "react";


const StatusBadge = props => {
    const {className, statusText} = props;

    return(
        <div className={`status-badge ${className}`}>
            <p>{statusText.toLowerCase()}</p>
        </div>
    );
};

export default StatusBadge;