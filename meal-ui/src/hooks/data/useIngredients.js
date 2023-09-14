import { useState, useEffect } from 'react';
import { ApiConfig } from 'config';
import { useFetch } from 'hooks/fetch';

export default function useIngredients() {
	const [ingredients, setIngredients] = useState([]);
	const { getApi } = useFetch();

	function getIngredients() {
		// the API will default to 25, which is reasonable. But to avoid implementing
		// dropdown scrolling pagination, this service bumps the default up
		const defaultTake = 200;
		const url = `${ApiConfig.API_URL}/ingredients/all?skip=${0}&take=${defaultTake}`;
		getApi(url).then(data => setIngredients(data));
	}

	useEffect(() => {
		getIngredients();
	}, []);

	return { ingredients };
}
