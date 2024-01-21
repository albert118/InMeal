const defaultRecipeImage = Object.freeze({
    url: '#',
    label: 'recipe image'
});

function mapToRecipeImage(apiBaseUrl, apiResponse) {
    return {
        url: `${apiBaseUrl}/${apiResponse.url}`,
        label: apiResponse.name
    };
}

export { defaultRecipeImage, mapToRecipeImage };
