import { demoImage } from 'DemoImage';
import { Badge } from 'components';
import { GoToCTA } from 'components';
import AppRoutes from 'navigation/AppRoutes';

export default function HorizontalCard({ onClick, children, ...additionalProps }) {
	const onBadgeClick = () => console.log('clicked badge');

	const _onClick = onClick ? () => console.log('cta clicked') : onClick;

	return (
		<div className='horiz-card'>
			<div className='horiz-card__image-slot'>
				<img
					src={demoImage.src}
					label={demoImage.label}
				/>
			</div>
			<div className='horiz-card__content-slot'>
				<h4>a demo title</h4>

				<div className='content-slot__badges info-badges__categories'>
					<Badge
						text='main'
						labelText='course'
						onClick={onBadgeClick}
					/>
					<Badge
						text='breakfast'
						labelText='cuisine'
						onClick={onBadgeClick}
					/>
					<Badge
						text='meal'
						labelText='type'
						onClick={onBadgeClick}
					/>
				</div>
				<div className='content-slot__badges info-badges__stats'>
					<Badge
						text='servings: 2'
						onClick={onBadgeClick}
					/>
					<Badge
						text='ingredients: 11'
						onClick={onBadgeClick}
					/>
				</div>
				<GoToCTA
					location={AppRoutes.root}
					additionalProps={additionalProps}
				/>
			</div>
		</div>
	);
}
