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
					text={recipe.course}
					labelText='course'
					onClick={onBadgeClick}
				/>
				<Badge
					text={recipe.category}
					labelText='cuisine'
					onClick={onBadgeClick}
				/>
				<Badge
					text={recipe.type}
					labelText='type'
					onClick={onBadgeClick}
				/>
			</div>
			<div className='tiled-badges__row'>
				<Badge
					text={`servings: ${recipe.servings}`}
					onClick={onBadgeClick}
				/>
				<Badge
					text={`ingredients: ${recipe.ingredientsCount}`}
					onClick={onBadgeClick}
				/>
			</div>
		</div>
	);
}
