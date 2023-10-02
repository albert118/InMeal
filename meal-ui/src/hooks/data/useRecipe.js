import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';
import { useContext, useEffect, useState } from 'react';
import { defaultRecipe } from 'types/DefaultRecipe';
import { mapToEditedRecipeDto, mapToEditableRecipe } from 'types/Recipes';
import { ErrorDetailContext } from './errorContext';

export default function useRecipe(recipeId) {
    const [recipe, setRecipe] = useState(defaultRecipe);
    const { getApi, postApi } = useFetch();
    const { setError } = useContext(ErrorDetailContext);

    function getRecipe(id) {
        if (id === undefined) return;
        const url = `${ApiConfig.API_URL}/recipes/${id}`;
        getApi(url)
            .then(data => {
                setRecipe(mapToEditableRecipe(data));
                setError(null);
            })
            .catch(setError);
    }

    useEffect(() => {
        getRecipe(recipeId);
    }, []);

    function postRecipe(newRecipe, onSuccess) {
        const url = `${ApiConfig.API_URL}/recipes/add`;
        postApi(url, newRecipe)
            .then(data => {
                setRecipe({ ...newRecipe, id: data });
                setError(null);
                if (!!onSuccess && typeof onSuccess === 'function')
                    onSuccess(data);
            })
            .catch(setError);
    }

    function postEditedRecipe(editedRecipe, onSuccess) {
        const url = `${ApiConfig.API_URL}/recipes/edit`;
        postApi(url, mapToEditedRecipeDto(editedRecipe))
            .then(data => {
                setRecipe(editedRecipe);
                setError(null);
                if (!!onSuccess && typeof onSuccess === 'function')
                    onSuccess(data);
            })
            .catch(setError);
    }

    return { postEditedRecipe, postRecipe, recipe };
}
