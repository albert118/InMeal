import { Route, Routes } from 'react-router-dom';

import Layout from 'pages/Layout';

import AppRoutes from 'navigation/AppRoutes';
import { Home, AddRecipe, EditRecipe, Recipes, ViewRecipe } from 'pages';

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
				element={<Home />}
			/>
			<Route
				path={AppRoutes.recipes}
				element={<Recipes />}
			/>
			<Route
				path={`${AppRoutes.recipe}/:recipeId`}
				element={<ViewRecipe />}
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
				element={<AddRecipe />}
			/>

			{/* 
                Redirect to Home until an explicit 404 page is added 
                    - a wildcard here would allow some requests to hit the backend incorrectly, use the explicity root route
            */}
			<Route
				path='/'
				element={<Home />}
			/>
		</Routes>
	);
};

export default RouterConfig;
