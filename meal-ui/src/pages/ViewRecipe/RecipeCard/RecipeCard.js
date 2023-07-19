import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { TitleBar, Button, Image } from 'components';
import { Checkbox } from 'forms/Inputs';
import { objectMap } from 'utils';

export default function RecipeCard({ recipe }) {
	return (
		<div className='card recipe-card'>
			<Image
				alt={recipe.title}
				className='image-slot'
			/>

			<TitleBar>{recipe.title}</TitleBar>

			<div className='recipe--data scrollbar-vertical'>
				<p className='recipe--blurb'>{recipe.blurb}</p>
				<div className='recipe--ingredients'>
					{recipe.recipeIngredients &&
						objectMap(recipe.recipeIngredients, (key, value) => (
							<Checkbox
								key={key}
								label={value.label}
								value={false}
							/>
						))}
				</div>
				<p className='recipe--steps'>{recipe.preparationSteps}</p>
			</div>
			<ActionContainer recipeId={recipe.id} />
		</div>
	);
}

function ActionContainer({ recipeId }) {
	const navigate = useNavigate();

	return (
		<div className='action-container'>
			<Button onClick={() => navigate(`${AppRoutes.recipe}/edit/${recipeId}`)}>edit</Button>
		</div>
	);
}
