import { Badge, IndexRow } from 'components';
import { HorizontalCard } from 'components/Card';
import AppRoutes from 'navigation/AppRoutes';
import { stringifyType } from 'utils';

export default function ManageRecipesRow({ label, recipes, onClick }) {
	return (
		<IndexRow label={label}>
			{recipes.map(recipe => {
				return (
					<HorizontalCard
						key={recipe.id}
						navigateLocation={`${AppRoutes.recipe}/${recipe.id}`}
						title={recipe.title}
						entityName='recipe'
						onClick={() => onClick(recipe)}
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
				{recipe.course !== 'Unknown' && (
					<Badge
						text={stringifyType(recipe.course)}
						labelText='course'
						onClick={onBadgeClick}
					/>
				)}
				{recipe.category !== 'Unknown' && (
					<Badge
						text={stringifyType(recipe.category)}
						labelText='cuisine'
						onClick={onBadgeClick}
					/>
				)}
				{recipe.type !== 'Unknown' && (
					<Badge
						text={stringifyType(recipe.type)}
						labelText='type'
						onClick={onBadgeClick}
					/>
				)}
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
