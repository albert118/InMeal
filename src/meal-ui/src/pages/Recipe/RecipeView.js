import React, { useContext } from 'react';
import Card from 'components/Card';
import { GenericContext } from 'pages/GenericPageContainer';


export default function RecipeView() {
    const genericContext = useContext(GenericContext);

    const classes = genericContext.className 
        ? `p-recipe-view recipe ${genericContext.className}` 
        : `p-recipe-view recipe`;

        return(
            <div className={classes}>
                <Card title="Unexplained Title">
                    <p className="temp-content">
                        Jibber jabber 
                    </p>
                </Card>
            </div>
        );
};