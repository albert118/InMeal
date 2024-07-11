import { Tile } from '@carbon/react';
import { GlassBackground, GoToCTA } from '../../components';

const ImageCard = ({
    id,
    className,
    label,
    ctaHandler,
    ...additionalProps
}) => {
    return (
        <Tile
            className={
                className ? `card image-card ${className}` : `card image-card`
            }
        >
            <div className='image-slot'>{additionalProps.children}</div>
            <div className='action' onClick={() => ctaHandler(id)}>
                <GlassBackground borderRadius='0 0 12px 12px' />
                <h4>{label}</h4>
                <GoToCTA {...additionalProps} />
            </div>
        </Tile>
    );
};

export default ImageCard;
