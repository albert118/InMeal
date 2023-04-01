import StatusBadge from 'components/StatusBadge';
import Button from 'components/Button';

const ImageCard = props => {
	const { id, className, label, status, ctaHandler } = props;

	const classes = className
		? `card image-card ${className}`
		: `card image-card`;

	return (
		<div className={classes}>
			<div className='image-slot'>
				{props.children}
				<StatusBadge
					className='e-image-status-badge'
					status={status}
				/>
			</div>
			<div className='action-slot'>
				<label className='action-label'>{label}</label>
				<Button
					size='lg'
					onClick={() => ctaHandler(id)}
				>
					view
				</Button>
			</div>
		</div>
	);
};

export default ImageCard;
