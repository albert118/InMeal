import { useEffect, useState } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';

export default function useUpcomingRecipes(mapper) {
    const [upcomingRecipes, setUpcomingRecipes] = useState([]);
    const { postApi } = useFetch();

    function fetchUpcomingRecipes() {
        const url = `${ApiConfig.API_URL}/upcoming/recommended`;
        postApi(url).then(data => setUpcomingRecipes(data.map(mapper)));
    }

    useEffect(() => {
        fetchUpcomingRecipes();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { upcomingRecipes };
}
