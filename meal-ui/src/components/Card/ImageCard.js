import { Tile } from '@carbon/react';
import { GoToCTA } from 'components';

const ImageCard = ({ id, className, label, ctaHandler, ...additionalProps }) => {
	return (
		<Tile className={className ? `card image-card ${className}` : `card image-card`}>
			<div className='image-slot'>{additionalProps.children}</div>
			<div
				className='action'
				onClick={() => ctaHandler(id)}
			>
				<h4>{label}</h4>
				<GoToCTA {...additionalProps} />
			</div>
		</Tile>
	);
};

export default ImageCard;
