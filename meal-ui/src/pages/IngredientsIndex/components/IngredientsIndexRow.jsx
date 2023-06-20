import IngredientBadge from './IngredientsBadge';
import EditIngredientNameForm from './EditIngredientNameForm';
import { IndexRow, EditModalWrapper } from 'components';

export default function IngredientsIndexRow({ label, ingredients }) {
	return (
		<IndexRow label={label}>
			{ingredients.map(ingredient => {
				return (
					<IngredientsModalBadge
						key={ingredient.id}
						ingredient={ingredient}
					/>
				);
			})}
		</IndexRow>
	);
}

function IngredientsModalBadge({ ingredient }) {
	return (
		<EditModalWrapper
			editCallback={() => console.log('hi')}
			headingText='Update ingredient name'
			labelText='edit ingredient'
			buttonComponent={
				<IngredientBadge
					ingredientName={ingredient.name}
					recipeUsagesCount={ingredient.recipeUsageCount}
				/>
			}
		>
			<EditIngredientNameForm existingIngredient={ingredient} />
		</EditModalWrapper>
	);
}
