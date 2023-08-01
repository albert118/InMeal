import { useState } from 'react';
import IngredientBadge from '../components/IngredientsBadge';
import EditIngredientForm from './EditIngredientNameForm';
import { EditModalWrapper } from 'components';
import { useIngredient } from 'hooks/data';

const defaultFormState = (name, units) => {
	return {
		name: name,
		unit: units.name,
		isDeleted: false
	};
};

export function IngredientsModalBadge({ ingredient, refreshData, measurementOptions }) {
	const { updateIngredientName, deleteIngredient } = useIngredient();
	const [formData, setFormData] = useState(defaultFormState(ingredient.name, ingredient.units));

	const onFormChange = event => {
		setFormData({
			...formData,
			[event.target.name]:
				event.target.name === 'isDeleted' ? event.target.checked : event.target.value
		});
	};

	const onEditSave = async () => {
		if (formData.isDeleted && ingredient.recipeUsageCount === 0) {
			deleteIngredient(ingredient.ingredientId);
			await refreshData();
		} else {
			console.log(formData);
			updateIngredientName(ingredient.ingredientId, formData.name, formData.unit);
			await refreshData();
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
				formData={formData}
				onChange={onFormChange}
				disableDeletion={ingredient.recipeUsageCount !== 0}
				recipeUsageCount={ingredient.recipeUsageCount}
				measurementOptions={measurementOptions}
			/>
		</EditModalWrapper>
	);
}
