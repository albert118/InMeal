import StatusBadge from 'components/StatusBadge';
import Button from 'components/Button';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';

const ImageCard = props => {
	const { id, className, label, status, ctaHandler } = props;

	const classes = className
		? `card image-card ${className}`
		: `card image-card`;

	return (
		<Card className={classes}>
			<CardOverflow>
				<AspectRatio ratio='2'>
					<div className='image-slot'>
						{props.children}
						<StatusBadge
							className='e-image-status-badge'
							status={status}
						/>
					</div>
				</AspectRatio>
			</CardOverflow>
			<CardOverflow>
				<div className='action-slot'>
					<label>
						<Typography
							level='h5'
							sx={{ mt: 0.5, mb: 2 }}
						>
							{label}
						</Typography>
					</label>
					<Button handler={() => ctaHandler(id)}>
						<Typography level='body2'>view</Typography>
					</Button>
				</div>
			</CardOverflow>
		</Card>
	);
};

export default ImageCard;
