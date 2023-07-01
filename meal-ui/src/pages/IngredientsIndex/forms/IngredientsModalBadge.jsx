import { useState } from 'react';
import IngredientBadge from '../components/IngredientsBadge';
import EditIngredientForm from './EditIngredientNameForm';
import { EditModalWrapper } from 'components';
import { useIngredient } from 'hooks/data';
import { isFalsishOrEmpty } from 'utils';

const defaultFormState = name => {
	return {
		name: name,
		isDeleted: false
	};
};

export function IngredientsModalBadge({ ingredient, refreshData }) {
	const { updateIngredientName, deleteIngredient } = useIngredient();
	const [formData, setFormData] = useState(defaultFormState(ingredient.name));

	const onFormChange = event => {
		setFormData({
			...formData,
			[event.target.name]:
				event.target.name === 'isDeleted' ? event.target.checked : event.target.value
		});
	};

	const onEditSave = async () => {
		if (formData.isDeleted && ingredient.recipeUsageCount === 0) {
			deleteIngredient(ingredient.id);
			await refreshData();
		} else if (IsIngredientNameValid(ingredient.name, formData.name)) {
			updateIngredientName(ingredient.id, formData.name);
			await refreshData();
		} else {
			setFormData(defaultFormState(ingredient.name));
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
			<EditIngredientForm
				currentName={formData.name}
				onChange={onFormChange}
				disableDeletion={ingredient.recipeUsageCount !== 0}
				recipeUsageCount={ingredient.recipeUsageCount}
			/>
		</EditModalWrapper>
	);
}

function IsIngredientNameValid(oldIngredientName, newIngredientName) {
	return !isFalsishOrEmpty(newIngredientName) && oldIngredientName !== newIngredientName;
}
