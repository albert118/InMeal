export const valueUpdateStrategies = Object.freeze({
	isDeleted: target => target.checked,
	default: target => target.value
});

export const defaultFormState = (name, units) => {
	return {
		name: name,
		unit: units.name,
		isDeleted: false
	};
};

export const initialFormState = Object.freeze({
	name: '',
	unit: '',
	isDeleted: false
});
