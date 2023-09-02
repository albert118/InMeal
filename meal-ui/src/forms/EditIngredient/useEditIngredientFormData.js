import { useState, useEffect } from 'react';
import { useIngredient } from 'hooks/data';

const defaultFormState = (name, units) => {
	return {
		name: name,
		unit: units.name,
		isDeleted: false
	};
};

export default function useEditIngredientFormData(ingredient) {
	const [formData, setFormData] = useState(defaultFormState(ingredient.name, ingredient.units));
	const [disableDelete, setDisableDelete] = useState(ingredient.recipeUsageCount !== 0);

	const { updateIngredient, deleteIngredient } = useIngredient();

	const valueUpdateStrategies = {
		isDeleted: target => target.checked,
		default: target => target.value
	};

	useEffect(() => {
		setDisableDelete(ingredient.recipeUsageCount !== 0);
	}, [ingredient]);

	function onUpdate(event) {
		const getTarget = valueUpdateStrategies[event.target.name] ?? valueUpdateStrategies['default'];

		setFormData({
			...formData,
			[event.target.name]: getTarget(event.target)
		});
	}

	// no event to receive, as the modal isn't a form
	// returns the fetch promise so the consumer can wait for a success/error response
	function onSubmit() {
		const shouldDelete = formData.isDeleted && ingredient.recipeUsageCount === 0;

		if (shouldDelete) {
			return deleteIngredient(ingredient.ingredientId);
		}

		// dont post an update if no data has changed
		// this hack is (again) because of the modal being 'clever' remembering state between re-opens
		if (formData.name !== ingredient.name) {
			return updateIngredient(ingredient.ingredientId, formData.name, formData.unit);
		}

		return Promise.resolve();
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
