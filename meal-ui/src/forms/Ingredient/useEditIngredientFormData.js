import FormStatuses from 'forms/FormStatuses';
import { ErrorDetailContext, useIngredient, useMeasurements } from 'hooks/data';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultFormState, getWarnings, initialFormState, valueUpdateStrategies } from './helpers';

export default function useEditIngredientFormData() {
	const { ingredientId } = useParams();

	const navigate = useNavigate();
	const { error } = useContext(ErrorDetailContext);

	const [formData, setFormData] = useState(initialFormState);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const {
		ingredient: existingIngredient,
		getIngredient,
		updateIngredient,
		deleteIngredient
	} = useIngredient();
	const { measurementOptions } = useMeasurements();

	useEffect(() => {
		getIngredient(ingredientId);
	}, []);

	useEffect(() => {
		if (!existingIngredient) return;
		setFormData(defaultFormState(existingIngredient.name, existingIngredient.units));
	}, [existingIngredient]);

	useEffect(() => {
		setFormStatus(error ? FormStatuses.Error : FormStatuses.Saved);
	}, [error]);

	function onUpdate(event) {
		const getTarget = valueUpdateStrategies[event.target.name] ?? valueUpdateStrategies['default'];

		setFormData({
			...formData,
			[event.target.name]: getTarget(event.target)
		});
	}

	function onCancel(event) {
		event.preventDefault();
		navigate(-1);
	}

	function onSubmit(event) {
		event.preventDefault();

		const shouldDelete = formData.isDeleted && existingIngredient.recipeUsageCount === 0;

		console.log(existingIngredient);
		if (shouldDelete) {
			return deleteIngredient(existingIngredient.id);
		}

		if (formData.name !== existingIngredient.name) {
			return updateIngredient(existingIngredient.id, formData.name, formData.unit);
		}

		setFormStatus(FormStatuses.Saved);
		navigate(-1);
	}

	function getWarnings() {
		if (!existingIngredient) return [];

		const recipePlural = existingIngredient.recipeUsageCount > 1 ? 'recipes' : 'recipe';
		const usagePlural = existingIngredient.recipeUsageCount > 1 ? 'usages' : 'usage';

		return [
			`ingredient is currently used in ${existingIngredient.recipeUsageCount} ${recipePlural}`,
			`remove the ${usagePlural} to delete this ingredient`
		];
	}

	const canDelete = () => existingIngredient?.recipeUsageCount !== 0;

	return {
		formData,
		measurementOptions,
		formStatus,
		onUpdate,
		onSubmit,
		onCancel,
		getWarnings,
		canDelete
	};
}
