import React, { useContext, useEffect, useState } from "react";
import Card from 'components/Card';
import Carousel from 'components/Carousel';
import { FormStatuses } from "forms";
import { GenericContext } from 'pages/GenericPageContainer';
import { useNavigate } from "react-router-dom";
import useFetch from 'use-http';
import AppRoutes from 'navigation/AppRoutes';


// "missing ingredients"
// "unprepared"
// "prepared"
// "ready to prepare"
const recipeIds = [
    "2b271329-83dc-4123-be11-f1ac96873868",
    "4cf33993-777f-497d-b007-4f2e333e2dca",
    "918e8444-db04-452d-a40d-295039fbdf93",
    "c24e6841-c919-4c49-b283-2d10697216f6",
    "ea7ca771-889c-4e53-ae88-e2b11a2c20ee"
];

const demoImage = {
    label: "Breakfast",
    url: "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif"
};

const getStartingRecipe = recipeId => {
    return {
        id: recipeId,
        title: '',
        
        blurb: '',
        recipeIngredients: [],
        prepSteps: [],
        
    };
};


    // const plannedItems = [
    //     { id: 1, label: "Breakfast", status: FormStatuses.Unknown, imgUrl: "https://media.tenor.com/fokbHD7dZNUAAAAC/food-chinese.gif", handler: handleViewRecipeClick },
    //     { id: 2, label: "Lunch", status: FormStatuses.Unknown, imgUrl: "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif", handler: handleViewRecipeClick },
    //     { id: 3, label: "Dinner", status: FormStatuses.Unknown, imgUrl: "https://bestanimations.com/media/food/1310335691frenchfries-animated-gif.gif", handler: handleViewRecipeClick }
    // ];

    // const suggestedItems = [
    //     { id: 4, label: "Breakfast bowl", status: FormStatuses.Unknown, imgUrl: "https://i.pinimg.com/originals/28/0e/bc/280ebc35f36d9571f08cd61ab422235d.gif", handler: handleViewRecipeClick },
    //     { id: 5, label: "Dessert Cake", status: FormStatuses.Unknown, imgUrl: "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/23/3/enhanced/webdr13/anigif_enhanced-10889-1435044961-2.gif", handler: handleViewRecipeClick },
    //     { id: 6, label: "Bulking Shake", status: FormStatuses.Unknown, imgUrl: "https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif", handler: handleViewRecipeClick }
    // ];

export default function View() {
    const genericContext = useContext(GenericContext);
    const navigate = useNavigate();

    const classes = genericContext.className 
        ? `p-home-view ${genericContext.className}` 
        : `p-home-view`;

    const handleViewRecipeClick = id => navigate(`${AppRoutes.recipe}/${id}`);
    const { post, response } = useFetch('https://localhost:7078/api/recipes');

    const [recipes, setRecipes] = useState(recipeIds.map(getStartingRecipe));
    const [plannedItems, setPlannedItems] = useState([]);
    const [suggestedItems, setSuggestedItems] = useState([]);

    const getPlannedItems = () => recipes.slice(0, 2).map(mapForDisplay);
    const getSuggestedItems = () => recipes.slice(3,).map(mapForDisplay);

    // inject handler, display status, etc.
    // TODO handle image, label, status
    const mapForDisplay = recipe => {
        return {
            id: recipe.id,
            content: recipe,
            label: "Breakfast",
            status: FormStatuses.Unknown,
            handler: handleViewRecipeClick,
            image: demoImage 
        }
    };

    useEffect(() => { loadData() }, []);

    async function loadData() {
        const allRecipes = await post(recipeIds);
        if (response.ok)  {
            setRecipes(allRecipes);
            setPlannedItems(getPlannedItems());
            setSuggestedItems(getSuggestedItems());
        }
    }

    return (
        <div className={classes}>
            <div className="hero-grid">
                <Card className="planning-quick-view" title="Upcoming...">
                    <Carousel items={plannedItems}/>
                </Card>
                <Card className="explore-quick-view" title="Something else?">
                    <Carousel items={suggestedItems}/>
                </Card>
            </div>
        </div>
    );
};
