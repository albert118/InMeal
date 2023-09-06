const defaultQuantity = 1;
const defaultUnits = { name: 'unknown' };

export function createRecipeIngredient(name, id, units) {
	return {
		label: name,
		ingredientId: id,
		quantity: defaultQuantity,
		units: units ?? defaultUnits
	};
}
