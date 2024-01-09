import { useState, useEffect } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';

export default function useAlphabeticallyIndexedIngredients() {
    const [indexedIngredients, setIndexedIngredients] = useState({});
    const [shouldRefresh, toggleRefresh] = useState(false);

    const { getApi } = useFetch();

    function getIndexedIngredients() {
        const url = `${ApiConfig.API_URL}/ingredients/indexed`;
        getApi(url).then(data => setIndexedIngredients(data));
    }

    useEffect(() => {
        getIndexedIngredients();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldRefresh]);

    const refreshData = () => {
        toggleRefresh(!shouldRefresh);
    };

    return { indexedIngredients, refreshData };
}
