import { GriApiConfig } from '../../config';
import { useFetch } from '../../hooks/fetch';
import { useContext, useEffect, useState } from 'react';
import { defaultRecipeImage, mapToRecipeImage } from '../../types/RecipeImage';
import { ErrorDetailContext } from './errorContext';

export default function useRecipe(recipeId) {
    const [recipeImage, setRecipeImage] = useState(defaultRecipeImage);
    const { getApi } = useFetch();
    const { setError } = useContext(ErrorDetailContext);

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

        getApi(`${GriApiConfig.API_URL}/images`)
            .then(data => {
                setRecipeImage(GriApiConfig.API_URL, mapToRecipeImage(data));
                setError(null);
            })
            .catch(setError);
    }

    useEffect(() => {
        getRecipeImage(recipeId);
    }, []);

    return { recipeImage: recipeImage };
}
