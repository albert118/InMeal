import React from 'react';
import GenericPageContainer from 'pages/GenericPageContainer';
import RecipeView from './RecipeView';

export default function HomeContainer() {
    return (
        <GenericPageContainer>
            <RecipeView />
        </GenericPageContainer>
    );
};
