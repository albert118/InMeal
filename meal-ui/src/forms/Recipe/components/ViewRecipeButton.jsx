import { Button } from 'components';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';

export default function ViewRecipeButton({ recipeId }) {
	const navigate = useNavigate();
	const onViewRecipe = () => navigate(`${AppRoutes.recipe}/${recipeId}`);

	return (
		<div className='action-container view-recipe-action'>
			<Button
				className='view-recipe-btn'
				onClick={onViewRecipe}
			>
				view recipe
			</Button>
		</div>
	);
}
