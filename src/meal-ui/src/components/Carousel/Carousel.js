import React from "react"


const StatusBadge = props => {
    const {className, statusText} = props;

    return(
        <div className={`status-badge ${className}`}>
            <p>{statusText.toLowerCase()}</p>
        </div>
    );
}

const Carousel = props => {
    const { className, items } = props;

    const item = items[0];

    const classes = className ? `carousel ${className}` : `carousel`;

    return(
        <div className={classes}>
            <div className="item img-content">
                <StatusBadge className="carousel-status-badge" statusText={item.status} />
                <label className="item-label faded-background e-carousel-item-label">{item.label}</label>
            </div> 
        </div>
    );
};

export default Carousel;