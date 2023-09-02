import { IndexRow } from 'components';
import { SelectableRecipeCard } from 'components/RecipeCard';

export default function ManageRecipesRow({ label, recipes }) {
	return (
		<IndexRow label={label}>
			{recipes.map(recipe => {
				return (
					<SelectableRecipeCard
						key={recipe.id}
						recipe={recipe}
						label={'this'}
					></SelectableRecipeCard>
				);
			})}
		</IndexRow>
	);
}
