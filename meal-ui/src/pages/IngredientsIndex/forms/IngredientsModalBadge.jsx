import { useState } from 'react';
import IngredientBadge from '../components/IngredientsBadge';
import EditIngredientNameForm from './EditIngredientNameForm';
import { EditModalWrapper } from 'components';
import { useIngredient } from 'hooks/data';
import { isFalsishOrEmpty } from 'utils';

export function IngredientsModalBadge({ ingredient, refreshData }) {
	const { updateIngredientName } = useIngredient();
	const [name, setName] = useState(ingredient.name);

	const onEditSave = async () => {
		if (IsIngredientNameValid(ingredient.name, name)) {
			updateIngredientName(ingredient.id, name);
			await refreshData();
		} else {
			setName(ingredient.name);
		}
	};

	return (
		<EditModalWrapper
			editCallback={onEditSave}
			headingText='Update ingredient'
			labelText={`editing ${ingredient.name}`}
			buttonComponent={
				<IngredientBadge
					ingredientName={ingredient.name}
					recipeUsagesCount={ingredient.recipeUsageCount}
				/>
			}
		>
			<EditIngredientNameForm
				currentName={name}
				onChange={e => setName(e.target.value)}
			/>
		</EditModalWrapper>
	);
}

function IsIngredientNameValid(oldIngredientName, newIngredientName) {
	return !isFalsishOrEmpty(newIngredientName) && oldIngredientName !== newIngredientName;
}
