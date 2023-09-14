import { Image, TitleBar } from 'components';
import { NumberInput, TextInput } from 'forms/Inputs';
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

			<div className='recipe-card__data scrollbar-vertical'>
				<p className='recipe-data__blurb'>{recipe.blurb}</p>
				<RecipeIngredients recipeIngredients={recipe.recipeIngredients} />
			</div>
		</div>
	);
}

function RightPane({ recipe }) {
	return (
		<div className='card recipe-card two-pane-recipe-card--right'>
			<div className='recipe-card__data scrollbar-vertical'>
				<div className='recipe-data__meta-wrapper'>
					<div className='recipe-data__meta'>
						<TextInput
							label='category'
							value={recipe.category}
							disabled={true}
						/>
						<TextInput
							label='meal type'
							value={recipe.type}
							disabled={true}
						/>
						<TextInput
							label='course'
							value={recipe.course}
							disabled={true}
						/>
						<NumberInput
							value={recipe.servings}
							label='servings'
							disabled={true}
						/>
						<NumberInput
							value={recipe.prepTime}
							label='preparation time (minutes)'
							disabled={true}
						/>
						<NumberInput
							value={recipe.cookTime}
							label='cook time (minutes)'
							disabled={true}
						/>
					</div>
				</div>
				<p className='recipe__steps'>{recipe.preparationSteps}</p>
			</div>
			<Actions
				className='recipe-card__actions'
				recipeId={recipe.id}
			/>
		</div>
	);
}
