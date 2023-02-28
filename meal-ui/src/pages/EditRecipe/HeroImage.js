import StatusBadge from 'components/StatusBadge';

export default function HeroImage(props) {
	const { image, label, status } = props;

	return (
		<div className='image-slot'>
			<img
				src={image.url}
				alt={label}
			/>
			<StatusBadge
				className='e-image-status-badge'
				status={status}
			/>
		</div>
	);
}
