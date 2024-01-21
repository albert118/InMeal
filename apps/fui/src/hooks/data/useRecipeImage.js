export default function useRecipe() {
    function getRecipeImage(id) {
        if (id === undefined) {
            console.warn(
                'loading a random dummy image from the image microservice'
            );
        } else {
            console.warn(
                'microservice is not configured to provide real content - ignoring recipe ID'
            );
        }

        return {
            url: 'http://localhost:8000/static/stir-fry.jpg',
            label: 'test image - not real!'
        };
    }

    return { getRecipeImage: getRecipeImage };
}
