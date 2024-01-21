// TODO: ensure backend serves all image references
// backend should then substitute env config for microservice
// ie. frontend shouldn't know about it
export default function useRecipeImage() {
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
