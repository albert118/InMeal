import React from 'react';
import { Route, Routes  } from 'react-router-dom';

import AppRoutes from 'navigation/AppRoutes';
import HomeContainer from 'pages/Home';
import ViewRecipesContainer from 'pages/ViewRecipes';
import ViewRecipe from 'pages/ViewRecipe';

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
           
            {/* TODO: Redirect to Home until a 404 page is added */}
            <Route 
                path="*" 
                element={<HomeContainer />}
            />
        </Routes >
    );
};

export default RouterConfig;