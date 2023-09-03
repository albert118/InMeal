import { Badge, IndexRow } from 'components';
import { HorizontalCard } from 'components/Card';
import AppRoutes from 'navigation/AppRoutes';

export default function ManageRecipesRow({ label, recipes }) {
	return (
		<IndexRow label={label}>
			{recipes.map(recipe => {
				return (
					<HorizontalCard
						key={recipe.id}
						navigateLocation={`${AppRoutes.recipe}/${recipe.id}`}
						title={recipe.title}
						entityName='recipe'
					>
						<RecipeDetailBadges recipe={recipe} />
					</HorizontalCard>
				);
			})}
		</IndexRow>
	);
}

function RecipeDetailBadges({ recipe }) {
	const onBadgeClick = () => console.log('clicked badge');

	return (
		<div className='tiled-badges'>
			<div className='tiled-badges__row'>
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
			<div className='tiled-badges__row'>
				<Badge
					text='servings: 2'
					onClick={onBadgeClick}
				/>
				<Badge
					text='ingredients: 11'
					onClick={onBadgeClick}
				/>
			</div>
		</div>
	);
}
