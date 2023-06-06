import View from './View';
import { useParams } from 'react-router-dom';
import { useRecipe } from 'hooks/data';
import { useContext, useEffect } from 'react';
import { LayoutContext } from 'pages/Layout';

export default function ViewRecipeContainer() {
	const { recipeId } = useParams();
	const { recipe, isLoading } = useRecipe(recipeId);

	const { setIsLoading } = useContext(LayoutContext);

	useEffect(() => {
		setIsLoading(isLoading);
	}, [isLoading]);

	return <View recipe={recipe} />;
}
