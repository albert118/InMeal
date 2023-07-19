import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { TitleBar, Button, Image } from 'components';
import { Checkbox } from 'forms/Inputs';
import { objectMap } from 'utils';

export function LeftPane({ recipe }) {
	return (
		<div className='card recipe-card'>
			<Image
				alt={recipe.title}
				className='image-slot'
			/>

			<TitleBar>{recipe.title}</TitleBar>

			<div className='recipe--data scrollbar-vertical'>
				<p className='recipe--blurb'>{recipe.blurb}</p>
				<RecipeIngredients recipeIngredients={recipe.recipeIngredients} />
			</div>
		</div>
	);
}

export function RightPane({ recipe }) {
	return (
		<div className='card recipe-card'>
			<div className='recipe--data scrollbar-vertical'>
				<p className='recipe--steps'>{recipe.preparationSteps}</p>
			</div>
			<Actions recipeId={recipe.id} />
		</div>
	);
}

function RecipeIngredients({ recipeIngredients }) {
	return (
		<div className='recipe--ingredients'>
			{recipeIngredients &&
				objectMap(recipeIngredients, (key, value) => (
					<Checkbox
						key={key}
						label={value.label}
						value={false}
					/>
				))}
		</div>
	);
}

function Actions({ recipeId }) {
	const navigate = useNavigate();

	return (
		<div className='action-container'>
			<Button onClick={() => navigate(`${AppRoutes.recipe}/edit/${recipeId}`)}>edit</Button>
		</div>
	);
}
