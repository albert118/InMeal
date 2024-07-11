import GlassBackground from '../GlassBackground';
import { faSquarePlus, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoToCTA } from '../../components';

export default function HorizontalCard({
    onClick,
    image,
    selected,
    ...additionalProps
}) {
    const { url, label } = image;

    return (
        <div className={`horiz-card ${selected ? 'horiz-card-selected' : ''}`}>
            {/* <GlassBackground /> */}

            <div className='horiz-card__image-slot' onClick={onClick}>
                <img src={url} label={label} alt={label} />
                {!selected && (
                    <div className='add'>
                        <FontAwesomeIcon icon={faSquarePlus} size={'2x'} />
                    </div>
                )}
                {selected && (
                    <div className='remove'>
                        <FontAwesomeIcon icon={faXmarkSquare} size={'2x'} />
                    </div>
                )}
            </div>
            <div className='horiz-card__content-slot' disabled={selected}>
                <div className='content'>
                    <h4>{additionalProps.title ?? ''}</h4>
                    {additionalProps.children}
                </div>
                <div className='actions'>
                    {/* optional navigation or generic button CTA */}
                    {additionalProps.navigateLocation && (
                        <GoToCTA
                            location={additionalProps.navigateLocation}
                            {...additionalProps}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
