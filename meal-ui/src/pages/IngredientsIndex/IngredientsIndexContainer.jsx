import { useEffect, useContext } from 'react';
import { LayoutContext } from 'pages/Layout';
import View from './View';

export default function IngredientsIndexContainer() {
    const { setIsLoading } = useContext(LayoutContext);

    const sampleIngredients = [
        { name: 'salt', count: 7 },
        { name: 'green onion', count: 7 },
        { name: 'shallots', count: 7 },
        { name: 'eggs', count: null },
        { name: 'butter', count: 0 },
    ];

    useEffect(() => {
		setIsLoading(false);
	}, []);

    return <View ingredients={sampleIngredients} />
}