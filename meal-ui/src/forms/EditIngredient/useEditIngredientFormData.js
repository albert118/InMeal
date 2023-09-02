import { useState, useEffect } from 'react';
import { useIngredient } from 'hooks/data';

const defaultFormState = (name, units) => {
	return {
		name: name,
		unit: units.name,
		isDeleted: false
	};
};

export default function useEditIngredientFormData(ingredient, refreshCallback) {
	const [formData, setFormData] = useState(defaultFormState(ingredient.name, ingredient.units));
	const [disableDelete, setDisableDelete] = useState(ingredient.recipeUsageCount !== 0);

	const { updateIngredient, deleteIngredient } = useIngredient();

	useEffect(() => {
		setDisableDelete(ingredient.recipeUsageCount !== 0);
	}, [ingredient]);

	function onUpdate(event) {
		setFormData({
			...formData,
			[event.target.name]:
				event.target.name === 'isDeleted' ? event.target.checked : event.target.value
		});
	}

	function onSubmit(event) {
		event.preventDefault();

		const shouldDelete = formData.isDeleted && ingredient.recipeUsageCount === 0;

		if (shouldDelete) {
			// TODO: ensure these callbacks work as expected with the datahook
			deleteIngredient(ingredient.ingredientId).then(() => refreshCallback());
		} else {
			updateIngredient(ingredient.ingredientId, formData.name, formData.unit).then(() =>
				refreshCallback()
			);
		}
	}

	function getWarnings() {
		const recipePlural = ingredient.recipeUsageCount > 1 ? 'recipes' : 'recipe';
		const usagePlural = ingredient.recipeUsageCount > 1 ? 'usages' : 'usage';

		return [
			`ingredient is currently used in ${ingredient.recipeUsageCount} ${recipePlural}`,
			`remove the ${usagePlural} to delete this ingredient`
		];
	}

	return {
		formData,
		onUpdate,
		onSubmit,
		getWarnings,
		disableDelete
	};
}
