import { useState, useContext, useEffect } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';
import { ErrorDetailContext } from './errorContext';

export default function useIngredients() {
    const [ingredients, setIngredients] = useState([]);
    const { setError } = useContext(ErrorDetailContext);
    const { getApi, postApi } = useFetch();

    function getIngredients() {
        // the API will default to 25, which is reasonable. But to avoid implementing
        // dropdown scrolling pagination, this service bumps the default up
        const defaultTake = 200;
        const url = `${
            ApiConfig.API_URL
        }/ingredients/all?skip=${0}&take=${defaultTake}`;
        getApi(url).then(data => setIngredients(data));
    }

    function deleteIngredients(ids) {
        const url = `${ApiConfig.API_URL}/ingredients/delete`;
        return postApi(url, { ingredientIds: ids })
            .then(() => {
                setError(null);
                setIngredients(ingredients.filter(i => !ids.includes(i.id)));
            })
            .catch(errorDetail => {
                setError(errorDetail);
            });
    }

    useEffect(() => {
        getIngredients();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { deleteIngredients, ingredients };
}
