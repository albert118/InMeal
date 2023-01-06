import React from 'react';
import { Route, Routes  } from 'react-router-dom';

import AppRoutes from 'navigation/AppRoutes';
import HomeContainer from 'pages/Home';
import ViewRecipeContainer from 'pages/Recipe';

const RouterConfig = () => {
    return (
        <Routes>
            <Route 
                path={AppRoutes.root} 
                element={<HomeContainer />}
            />
            <Route 
                path={AppRoutes.recipe} 
                element={<ViewRecipeContainer />}
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