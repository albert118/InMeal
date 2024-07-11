import { Tile } from '@carbon/react';
import { GlassBackground, GoToCTA, Selectable } from '../../components';
import { isFalsishOrEmpty } from '../../utils';

const ImageCard = ({
    id,
    className,
    label,
    ctaHandler,
    ...additionalProps
}) => {
    const cardHeight = additionalProps?.height ?? 300;
    const slotHeight = (2 / 3) * cardHeight;

    const { src, alt, onCheck } = additionalProps;

    if (!!onCheck && typeof onCheck !== 'function')
        throw Error(
            'A selectable image card must provide a valid onCheck handler'
        );

    return (
        <Tile
            className={className ? `image-card ${className}` : `image-card`}
            style={{
                height: cardHeight,
                width: cardHeight
            }}
        >
            {onCheck ? (
                <Selectable
                    className='image-slot'
                    onClick={isSelected => onCheck(id, isSelected)}
                >
                    <img src={src} alt={alt} />
                </Selectable>
            ) : (
                <div
                    className='image-slot'
                    style={{
                        height: slotHeight
                    }}
                >
                    <img src={src} alt={alt} />
                </div>
            )}
            <div className='action' onClick={() => ctaHandler(id)}>
                <GlassBackground borderRadius='0 0 12px 12px' />
                <h4>{label}</h4>
                <GoToCTA {...additionalProps} />
            </div>
        </Tile>
    );
};

export default ImageCard;
