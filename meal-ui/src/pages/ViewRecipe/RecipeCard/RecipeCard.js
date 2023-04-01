import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import AppRoutes from 'navigation/AppRoutes';
import TitleBar from 'components/TitleBar/TitleBar';
import { Checkbox } from 'forms/Inputs';

import { objectMap } from 'utils';

export default function RecipeCard(props) {
	const { className, recipe } = props;

	const classes = className
		? `card recipe-card ${className}`
		: `card recipe-card`;

	return (
		<div className={classes}>
			<div className='image-slot'>{props.children}</div>

			<TitleBar>{recipe.title}</TitleBar>

			<div className='recipe-data-slot recipe-content-grid scrollbar-vertical'>
				<Blurb blurb={recipe.blurb} />
				<Ingredients recipeIngredients={recipe.recipeIngredients} />
				<PreparationSteps preparationSteps={recipe.preparationSteps} />
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
				handler={() => navigate(`${AppRoutes.recipe}/edit/${recipeId}`)}
			>
				edit
			</Button>
		</div>
	);
}

function Blurb({ blurb }) {
	return <p className='recipe-content-blurb'>{blurb}</p>;
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

function PreparationSteps({ preparationSteps }) {
	return (
		<p className='recipe-content-preparation-steps simple-numbered-list'>
			{preparationSteps}
		</p>
	);
}
