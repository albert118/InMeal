import { useEffect, useContext } from 'react';
import { LayoutContext } from 'pages/Layout';
import { useAlphabeticallyIndexedIngredients } from 'hooks/data';
import View from './View';

export default function IngredientsIndexContainer() {
    const { indexedIngredients, isLoading: isLoadingIngredients } = useAlphabeticallyIndexedIngredients();

    const { setIsLoading } = useContext(LayoutContext);

    useEffect(() => {
		setIsLoading(isLoadingIngredients);
	}, [isLoadingIngredients]);

    return !isLoadingIngredients && <View indexedIngredients={indexedIngredients} />
}
