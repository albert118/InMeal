import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import AppRoutes from 'navigation/AppRoutes';
import TitleBar from 'components/TitleBar/TitleBar';
import { Checkbox } from 'forms/Inputs';

import { objectMap } from 'utils';

export default function RecipeCard({ className, recipe, ...additionalProps }) {
	return (
		<div
			className={
				className ? `card recipe-card ${className}` : `card recipe-card`
			}
		>
			<div className='image-slot'>{additionalProps.children}</div>

			<TitleBar>{recipe.title}</TitleBar>

			<div className='recipe-data-slot recipe-content-grid scrollbar-vertical'>
				<Blurb>{recipe.blurb}</Blurb>
				<Ingredients recipeIngredients={recipe.recipeIngredients} />
				<PreparationSteps>{recipe.preparationSteps}</PreparationSteps>
			</div>
			<ActionContainer recipeId={recipe.id} />
		</div>
	);
}

function ActionContainer({ recipeId }) {
	const navigate = useNavigate();

	return (
		<div className='action-container'>
			<Button
				onClick={() => navigate(`${AppRoutes.recipe}/edit/${recipeId}`)}
			>
				edit
			</Button>
		</div>
	);
}

function Blurb(props) {
	<p className='recipe-content-blurb'>{props.children}</p>;
}

function Ingredients({ recipeIngredients }) {
	return (
		<div className='recipe-content-ingredients'>
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

function PreparationSteps(props) {
	return (
		<p className='recipe-content-preparation-steps simple-numbered-list'>
			{props.children}
		</p>
	);
}
