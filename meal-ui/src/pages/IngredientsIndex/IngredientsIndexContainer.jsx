import { useEffect, useContext } from 'react';
import { LayoutContext } from 'pages/Layout';
import View from './View';

export default function IngredientsIndexContainer() {
    const { setIsLoading } = useContext(LayoutContext);

    const indexedIngredients = {
        '#': [{ Id: 1, Name: '12 things', RecipeUsageCount: 0 }, { Id: 2, Name: '@#$ typo', RecipeUsageCount: 0 }],
        'A': [{ Id: 3, Name: 'anchovies', RecipeUsageCount: 1 }, { Id: 4, Name: 'avocado', RecipeUsageCount: 2 }, { Id: 5, Name: 'asparagus', RecipeUsageCount: 4 }],
        'B': [{ Id: 6, Name: 'butter', RecipeUsageCount: 7 }, { Id: 7, Name: 'berries', RecipeUsageCount: 17 }, { Id: 8, Name: 'baking soda', RecipeUsageCount: 2 }],
        'C': [{ Id: 9, Name: 'coconut', RecipeUsageCount: 1 }, { Id: 10, Name: 'chocolate', RecipeUsageCount: 3 }, { Id: 11, Name: 'celery', RecipeUsageCount: 1 }]
    };

    useEffect(() => {
		setIsLoading(false);
	}, []);

    return <View indexedIngredients={indexedIngredients} />
}
