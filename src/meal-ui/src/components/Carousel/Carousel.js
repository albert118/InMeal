import React from "react"


const StatusBadge = props => {
    const {className, statusText} = props;

    return(
        <div className={`status-badge ${className}`}>
            <p>{statusText.toLowerCase()}</p>
        </div>
    );
}

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

const Carousel = props => {
    const { className, items } = props;

    const classes = className ? `carousel ${className}` : `carousel`;

    return(
        <div className={classes}>
            { items.map(
                    item => 
                    <ImageCard label={item.label} status={item.status}>
                        <img src={item.imgUrl} alt={item.label} />
                    </ImageCard>
            )}
        </div>
    );
};

export default Carousel;
