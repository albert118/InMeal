import { TitleBar, Image } from 'components';
import { Actions } from './Actions';
import { RecipeIngredients } from './RecipeIngredients';

export default function TwoPaneRecipeCard({ recipe }) {
	return (
		<div className='two-pane-recipe-card'>
			<LeftPane recipe={recipe} />
			<RightPane recipe={recipe} />
		</div>
	);
}

function LeftPane({ recipe }) {
	return (
		<div className='card recipe-card two-pane-recipe-card--left'>
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

function RightPane({ recipe }) {
	return (
		<div className='card recipe-card two-pane-recipe-card--right'>
			<div className='recipe--data scrollbar-vertical'>
				<p className='recipe--steps'>{recipe.preparationSteps}</p>
			</div>
			<Actions recipeId={recipe.id} />
		</div>
	);
}