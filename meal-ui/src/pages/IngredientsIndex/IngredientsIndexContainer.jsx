import { useEffect, useContext } from 'react';
import { LayoutContext } from 'pages/Layout';
import View from './View';

export default function IngredientsIndexContainer() {
    const { setIsLoading } = useContext(LayoutContext);

    const sampleIngredients = {
        '#': [{ id: 1, name: '12 things', count: 0 }, { id: 2, name: '@#$ typo', count: 0 }],
        'A': [{ id: 3, name: 'anchovies', count: 1 }, { id: 4, name: 'avocado', count: 2 }, { id: 5, name: 'asparagus', count: 4 }],
        'B': [{ id: 6, name: 'butter', count: 7 }, { id: 7, name: 'berries', count: 17 }, { id: 8, name: 'baking soda', count: 2 }],
        'C': [{ id: 9, name: 'coconut', count: 1 }, { id: 10, name: 'chocolate', count: 3 }, { id: 11, name: 'celery', count: 1 }]
    };

    useEffect(() => {
		setIsLoading(false);
	}, []);

    return <View indexedIngredients={sampleIngredients} />
}
