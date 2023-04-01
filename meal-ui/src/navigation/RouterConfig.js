import { Route, Routes } from 'react-router-dom';

import AppRoutes from 'navigation/AppRoutes';
import HomeContainer from 'pages/Home';
import ViewRecipesContainer from 'pages/ViewRecipes';
import ViewRecipe from 'pages/ViewRecipe';
import EditRecipe from 'pages/EditRecipe';
import AddRecipeContainer from 'pages/AddRecipe/AddRecipeContainer';

import { Content } from '@carbon/react';

/// Route naming convention is
////    specific entity actions `/entitiy/action/id`
///     views                   `/entitiy/id`
///     pages                   `/page`
///     errors / protocols      `/error-code-page`
const RouterConfig = () => {
	return (
		<Routes>
			<Route
				path={AppRoutes.root}
				element={
					<Content>
						<HomeContainer />
					</Content>
				}
			/>
			<Route
				path={AppRoutes.recipes}
				element={
					<Content>
						<ViewRecipesContainer />
					</Content>
				}
			/>
			<Route
				path={`${AppRoutes.recipe}/:recipeId`}
				element={
					<Content>
						<ViewRecipe />
					</Content>
				}
			/>

			<Route
				path={`${AppRoutes.recipe}/edit/:recipeId`}
				element={
					<Content>
						<EditRecipe />
					</Content>
				}
			/>

			<Route
				path={`${AppRoutes.recipe}/add`}
				element={
					<Content>
						<AddRecipeContainer />
					</Content>
				}
			/>

			{/* 
                Redirect to Home until an explicit 404 page is added 
                    - a wildcard here would allow some requests to hit the backend incorrectly, use the explicity root route
            */}
			<Route
				path='/'
				element={
					<Content>
						<HomeContainer />
					</Content>
				}
			/>
		</Routes>
	);
};

export default RouterConfig;
