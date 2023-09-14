import FormStatuses from 'forms/FormStatuses';
import { useIngredient, useMeasurements } from 'hooks/data';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorDetailContext } from 'hooks/data';
import { getWarnings, valueUpdateStrategies } from './helpers';

const defaultFormState = (name, units) => {
	return {
		name: name,
		unit: units.name,
		isDeleted: false
	};
};

export default function useEditIngredientFormData() {
	const { ingredientId } = useParams();
	const navigate = useNavigate();
	const { error } = useContext(ErrorDetailContext);

	const [existingIngredient, setIngredient] = useState({
		name: 'test',
		recipeUsageCount: 0,
		units: { label: 'test' }
	});

	const [formData, setFormData] = useState(
		defaultFormState(existingIngredient.name, existingIngredient.units)
	);
	const [canDelete, setCanDelete] = useState(existingIngredient.recipeUsageCount !== 0);
	const [formStatus, setFormStatus] = useState(FormStatuses.Saved);

	// TODO: getIngredient
	const { updateIngredient, deleteIngredient } = useIngredient();
	const { measurementOptions } = useMeasurements();

	// TODO:
	// useEffect(() => {
	// 	getIngredient(ingredientId).then(i => setIngredient(i));
	// }, []);

	useEffect(() => {
		setIngredient(existingIngredient);
		setCanDelete(existingIngredient.recipeUsageCount !== 0);
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

// helpers
