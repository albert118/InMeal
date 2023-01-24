import React from 'react';
import { Route, Routes  } from 'react-router-dom';

import AppRoutes from 'navigation/AppRoutes';
import HomeContainer from 'pages/Home';
import ViewRecipesContainer from 'pages/ViewRecipes';
import ViewRecipe from 'pages/ViewRecipe';
import EditRecipe from 'pages/EditRecipe';

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
                element={<HomeContainer />}
            />
            <Route 
                path={AppRoutes.recipes} 
                element={<ViewRecipesContainer />}
            />
            <Route 
                path={`${AppRoutes.recipe}/:recipeId`} 
                element={<ViewRecipe />}
            />

            <Route 
                path={`${AppRoutes.recipe}/edit/:recipeId`} 
                element={<EditRecipe />}
            />
           
            {/* TODO: Redirect to Home until a 404 page is added */}
            <Route 
                path="*" 
                element={<HomeContainer />}
            />
        </Routes >
    );
};

export default RouterConfig;