import React from "react";
import StatusBadge from "components/StatusBadge";

const ImageCard = props => {
    const { className, label, status } = props;
    
    const classes = className ? `image-card ${className}` : `image-card`;

    return(
        <div className={classes}>
            <div className="image-slot">
                {props.children}
                <StatusBadge className="e-image-status-badge" statusText={status} />
            </div>
            <div className="action-slot">
                <label className="action-label">{label}</label>
                <button className="btn" type="button">continue</button>
            </div>
        </div>
    );
};

export default ImageCard;