import FormStatuses from 'forms/FormStatuses';
import { useIngredient, useMeasurements } from 'hooks/data';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorDetailContext } from 'hooks/data';
import { getWarnings, defaultFormState, initialFormState, valueUpdateStrategies } from './helpers';

export default function useEditIngredientFormData() {
	const { ingredientId } = useParams();

	const navigate = useNavigate();
	const { error } = useContext(ErrorDetailContext);

	const [formData, setFormData] = useState(initialFormState);
	const [canDelete, setCanDelete] = useState(false);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	const { existingIngredient, getIngredient, updateIngredient, deleteIngredient } = useIngredient();
	const { measurementOptions } = useMeasurements();

	useEffect(() => {
		getIngredient(ingredientId).then(existing => {
			setFormData(defaultFormState(existing.name, existing.units));
			setCanDelete(existing.recipeUsageCount !== 0);
		});
	}, []);

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

		if (shouldDelete) {
			return deleteIngredient(existingIngredient.ingredientId);
		}

		if (formData.name !== existingIngredient.name) {
			return updateIngredient(existingIngredient.ingredientId, formData.name, formData.unit);
		}

		setFormStatus(FormStatuses.Saved);
		navigate(-1);
	}

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
