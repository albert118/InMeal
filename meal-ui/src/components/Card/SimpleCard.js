import { Tile } from '@carbon/react';

const SimpleCard = ({ className, children }) => {
    return (
        <Tile
            className={
                className ? `card simple-card ${className}` : `card simple-card`
            }
        >
            <div className='content-slot'>{children}</div>
        </Tile>
    );
};

export default SimpleCard;
