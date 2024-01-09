import { ApiConfig } from '../../config';
import { useFetch } from '../../hooks/fetch';
import { useContext, useEffect, useState } from 'react';
import { DefaultMeta } from '../../types/DefaultMeta';
import { ErrorDetailContext } from './errorContext';

export default function useRecipe() {
    const { getApi } = useFetch();
    const { setError } = useContext(ErrorDetailContext);
    const [meta, setMeta] = useState(DefaultMeta);

    function getMeta() {
        const url = `${ApiConfig.API_URL}/recipes/meta`;
        getApi(url)
            .then(data => {
                setMeta(data);
                setError(null);
            })
            .catch(setError);
    }

    useEffect(() => {
        getMeta();
    }, []);

    return { meta };
}
