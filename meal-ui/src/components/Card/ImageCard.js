import StatusBadge from 'components/StatusBadge';
import { ClickableTile } from '@carbon/react';
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
		<ClickableTile
			onClick={() => ctaHandler(id)}
			className={
				className ? `card image-card ${className}` : `card image-card`
			}
		>
			{additionalProps.children}
			<StatusBadge
				className='e-image-status-badge'
				status={status}
			/>
			<div className='action-slot'>
				<h4>{label}</h4>
				<label>
					Got to {additionalProps.entityName ?? ''} <ArrowRight />
				</label>
			</div>
		</ClickableTile>
	);
};

export default ImageCard;
