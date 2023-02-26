import React from 'react';
import GenericPageContainer from 'pages/GenericPageContainer';
import View from './View';
import AppRoutes from 'navigation/AppRoutes';
import { FormStatuses } from 'forms';
import { demoImage } from 'DemoImage';
import { useNavigate } from 'react-router-dom';
import useRecipes from 'dataHooks/useRecipes';

const recipeIds = [
	'2b271329-83dc-4123-be11-f1ac96873868',
	'4cf33993-777f-497d-b007-4f2e333e2dca',
	'918e8444-db04-452d-a40d-295039fbdf93',
	'c24e6841-c919-4c49-b283-2d10697216f6',
	'ea7ca771-889c-4e53-ae88-e2b11a2c20ee'
];

export default function ViewRecipesContainer() {
	const navigate = useNavigate();

	const mapper = dto => {
		return {
			id: dto.id,
			content: dto,
			label: 'Breakfast',
			status: FormStatuses.Unknown,
			handler: id => navigate(`${AppRoutes.recipe}/${id}`),
			image: demoImage
		};
	};

	const { recipes, isLoading } = useRecipes(recipeIds, mapper);

	return (
		<GenericPageContainer>
			{!isLoading ? <View recipes={recipes} /> : 'loading...'}
		</GenericPageContainer>
	);
}
