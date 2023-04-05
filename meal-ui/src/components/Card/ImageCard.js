import StatusBadge from 'components/StatusBadge';
import { Tile } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

const ImageCard = ({
	id,
	className,
	label,
	status,
	ctaHandler,
	...additionalProps
}) => {
	return (
		<Tile
			className={
				className ? `card image-card ${className}` : `card image-card`
			}
		>
			{additionalProps.children}
			<StatusBadge
				className='e-image-status-badge'
				status={status}
			/>
			<div
				className='action'
				onClick={() => ctaHandler(id)}
			>
				<h4>{label}</h4>
				<label>
					Got to {additionalProps.entityName ?? ''} <ArrowRight />
				</label>
			</div>
		</Tile>
	);
};

export default ImageCard;
