import { Route, Routes } from 'react-router-dom';

import Layout from 'pages/Layout';

import AppRoutes from 'navigation/AppRoutes';
import { Home, AddRecipe, EditRecipe, Recipes, ViewRecipe, IngredientsIndex } from 'pages';

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
					<Layout>
						<Home />
					</Layout>
				}
			/>
			<Route
				path={AppRoutes.recipes}
				element={
					<Layout>
						<Recipes />
					</Layout>
				}
			/>
			<Route
				path={`${AppRoutes.recipe}/:recipeId`}
				element={
					<Layout>
						<ViewRecipe />
					</Layout>
				}
			/>

			<Route
				path={`${AppRoutes.recipe}/edit/:recipeId`}
				element={
					<Layout>
						<EditRecipe />
					</Layout>
				}
			/>

			<Route
				path={`${AppRoutes.recipe}/add`}
				element={
					<Layout>
						<AddRecipe />
					</Layout>
				}
			/>

			<Route
				path={`${AppRoutes.ingredients}`}
				element={
					<Layout>
						<IngredientsIndex />
					</Layout>
				}
			/>

			{/* 
                Redirect to Home until an explicit 404 page is added 
                    - a wildcard here would allow some requests to hit the backend incorrectly, use the explicity root route
            */}
			<Route
				path='/'
				element={
					<Layout>
						<Home />
					</Layout>
				}
			/>
		</Routes>
	);
};

export default RouterConfig;
