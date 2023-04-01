// TODO: quantity logic
const createIngredient = (name, id, numberOf) => {
	return {
		label: name,
		ingredientId: id,
		quantity: {
			amount: numberOf,
			units: 0
		}
	};
};

export { createIngredient };
