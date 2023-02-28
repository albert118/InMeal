import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import AppRoutes from 'navigation/AppRoutes';
import TitleBar from 'components/TitleBar/TitleBar';
import { Checkbox } from 'forms/Inputs';

const RecipeCard = props => {
	const { className, recipe } = props;

	const classes = className
		? `card recipe-card ${className}`
		: `card recipe-card`;

	const navigate = useNavigate();

	return (
		<div className={classes}>
			<div className='image-slot'>{props.children}</div>

			<TitleBar>{recipe.title}</TitleBar>

			<div className='recipe-data-slot recipe-content-grid scrollbar-vertical'>
				<p className='recipe-content-blurb'>{recipe.blurb}</p>
				<div className='recipe-content-ingredients'>
					{recipe.recipeIngredientDtos.map(ingredient => (
						<Checkbox
							key={ingredient.id}
							label={ingredient.label}
							value={false}
						/>
					))}
				</div>
				<ol
					type='1'
					className='recipe-content-preparation-steps simple-numbered-list'
				>
					{recipe.prepSteps &&
						recipe.prepSteps.map(step => <li>{step}</li>)}
				</ol>
			</div>
			<div className='action-container'>
				<Button
					handler={() =>
						navigate(`${AppRoutes.recipe}/edit/${recipe.id}`)
					}
				>
					edit
				</Button>
			</div>
		</div>
	);
};

export default RecipeCard;
