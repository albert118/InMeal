import StatusBadge from 'components/StatusBadge';
import { ClickableTile } from '@carbon/react';

const ImageCard = ({ id, className, label, status, ctaHandler, children }) => {
	return (
		<ClickableTile
			onClick={() => ctaHandler(id)}
			className={
				className ? `card image-card ${className}` : `card image-card`
			}
		>
			{children}
			<StatusBadge
				className='e-image-status-badge'
				status={status}
			/>
			<div className='action-slot'>
				<label className='action-label'>{label}</label>
			</div>
		</ClickableTile>
	);
};

export default ImageCard;
