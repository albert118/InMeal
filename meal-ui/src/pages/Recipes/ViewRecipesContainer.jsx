import React from 'react';
import View from './View';
import AppRoutes from 'navigation/AppRoutes';
import { FormStatuses } from 'forms';
import { demoImage } from 'DemoImage';
import { useNavigate } from 'react-router-dom';
import { useAllRecipes } from 'hooks/data';

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

	const { recipes, refreshData, archiveRecipes } = useAllRecipes(mapper);

	return (
		<View
			recipes={recipes}
			refreshGrid={refreshData}
			archiveRecipes={archiveRecipes}
		/>
	);
}
