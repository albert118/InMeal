import { useEffect, useState } from 'react';
import { ApiConfig } from '../../config';
import { useFetch } from '../../hooks/fetch';
import { useNavigate } from 'react-router-dom';

export default function useUpcomingRecipes() {
    const [upcomingRecipes, setUpcomingRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { postApi } = useFetch();

    const navigate = useNavigate();

    async function fetchUpcomingRecipesAsync() {
        setLoading(true);

        const url = `${ApiConfig.API_URL}/upcoming/recommended`;
        const data = await postApi(url);
        setUpcomingRecipes(
            data.map(dto => ({
                ...dto,
                onClick: id => navigate(`${AppRoutes.recipe}/${id}`)
            }))
        );

        setLoading(false);
    }

    useEffect(() => {
        fetchUpcomingRecipesAsync();
    }, []);

    return { upcomingRecipes, loading };
}
