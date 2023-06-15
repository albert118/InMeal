import { useEffect, useContext } from 'react';
import { LayoutContext } from 'pages/Layout';
import View from './View';

export default function IngredientsIndexContainer() {
    const { setIsLoading } = useContext(LayoutContext);

    const sampleIngredients = {
        '#': [{ name: '12 things', count: 0 }, { name: '@#$ typo', count: 0 }],
        'A': [{ name: 'anchovies', count: 1 }, { name: 'avocado', count: 2 }, { name: 'asparagus', count: 4 }],
        'B': [{ name: 'butter', count: 7 }, { name: 'berries', count: 17 }, { name: 'baking soda', count: 2 }],
        'C': [{ name: 'coconut', count: 1 }, { name: 'chocolate', count: 3 }, { name: 'celery', count: 1 }]
    };

    useEffect(() => {
		setIsLoading(false);
	}, []);

    return <View indexedIngredients={sampleIngredients} />
}
