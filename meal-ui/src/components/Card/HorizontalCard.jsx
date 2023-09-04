import { demoImage } from 'DemoImage';
import { GoToCTA } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function HorizontalCard({ image, navigateLocation, ...additionalProps }) {
	const { url, label } = image ?? demoImage;

	return (
		<div className='horiz-card'>
			<div className='horiz-card__image-slot'>
				<img
					src={url}
					label={label}
				/>
				<div className='add-button'>
					<FontAwesomeIcon
						icon={faPlus}
						size={'3x'}
					/>
				</div>
			</div>
			<div className='horiz-card__content-slot'>
				<h4>{additionalProps.title ?? ''}</h4>
				{additionalProps.children}

				<GoToCTA
					location={navigateLocation}
					{...additionalProps}
				/>
			</div>
		</div>
	);
}
