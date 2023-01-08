import React, { useContext } from 'react';
import { GenericContext } from 'pages/GenericPageContainer';
import { useParams } from "react-router-dom";
import { EditRecipeCardForm } from './EditRecipeCardForm';


export default function View() {
    const genericContext = useContext(GenericContext);
    const { recipeId } = useParams();

    const classes = genericContext.className 
        ? `p-recipe-edit scrollbar-vertical ${genericContext.className}` 
        : `p-recipe-edit scrollbar-vertical`;

    return(
        <div className={classes}>
            <EditRecipeCardForm recipeId={recipeId} />
        </div>
    );

};
