export function getWarnings(ingredient) {
	const recipePlural = ingredient.recipeUsageCount > 1 ? 'recipes' : 'recipe';
	const usagePlural = ingredient.recipeUsageCount > 1 ? 'usages' : 'usage';

	return [
		`ingredient is currently used in ${ingredient.recipeUsageCount} ${recipePlural}`,
		`remove the ${usagePlural} to delete this ingredient`
	];
}

export const valueUpdateStrategies = Object.freeze({
	isDeleted: target => target.checked,
	default: target => target.value
});
