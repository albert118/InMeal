const defaultRecipe = Object.freeze({
    id: null,
    title: 'new recipe',
    blurb: '',
    cookTime: 0,
    prepTime: 0,
    servings: 0,
    type: 'unknown',
    category: 'unknown',
    course: 'unknown',
    recipeIngredients: [],
    image: { url: '#' }
});

export { defaultRecipe };
