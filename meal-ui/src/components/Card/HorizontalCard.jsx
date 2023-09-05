import { faSquarePlus, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { demoImage } from 'DemoImage';
import { GoToCTA } from 'components';
import { useState } from 'react';

export default function HorizontalCard({ onClick, image, navigateLocation, ...additionalProps }) {
	const { url, label } = image ?? demoImage;
	const [selected, setSelected] = useState(false);

	const onClickWrapper = args => {
		setSelected(!selected);
		onClick(args);
	};

	return (
		<div className={`horiz-card ${selected ? 'horiz-card-selected' : ''}`}>
			<div
				className='horiz-card__image-slot'
				onClick={onClickWrapper}
			>
				<img
					src={url}
					label={label}
				/>
				{!selected && (
					<div className='add'>
						<FontAwesomeIcon
							icon={faSquarePlus}
							size={'2x'}
						/>
					</div>
				)}
				{selected && (
					<div className='remove'>
						<FontAwesomeIcon
							icon={faXmarkSquare}
							size={'2x'}
						/>
					</div>
				)}
			</div>
			<div
				className='horiz-card__content-slot'
				disabled={selected}
			>
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
