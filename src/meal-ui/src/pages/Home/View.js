import React, { useContext } from 'react';
import Card from 'components/Card';
import Carousel from 'components/Carousel';
import { GenericContext } from 'pages/GenericPageContainer';
import { useNavigate } from "react-router-dom";
import AppRoutes from 'navigation/AppRoutes';


export default function View() {
    const genericContext = useContext(GenericContext);
    const navigate = useNavigate();

    const classes = genericContext.className 
        ? `p-home-view ${genericContext.className}` 
        : `p-home-view`;

    const handleViewRecipeClick = id => navigate(`${AppRoutes.recipe}/${id}`);

    const plannedItems = [
        { id: 1, label: "Breakfast", status: "unprepared", imgUrl: "https://media.tenor.com/fokbHD7dZNUAAAAC/food-chinese.gif", handler: handleViewRecipeClick },
        { id: 2, label: "Lunch", status: "prepared", imgUrl: "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif", handler: handleViewRecipeClick },
        { id: 3, label: "Dinner", status: "unprepared", imgUrl: "https://bestanimations.com/media/food/1310335691frenchfries-animated-gif.gif", handler: handleViewRecipeClick }
    ];

    const suggestedItems = [
        { id: 4, label: "Breakfast bowl", status: "missing ingredients", imgUrl: "https://i.pinimg.com/originals/28/0e/bc/280ebc35f36d9571f08cd61ab422235d.gif", handler: handleViewRecipeClick },
        { id: 5, label: "Dessert Cake", status: "ready to prepare", imgUrl: "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/23/3/enhanced/webdr13/anigif_enhanced-10889-1435044961-2.gif", handler: handleViewRecipeClick },
        { id: 6, label: "Bulking Shake", status: "ready to prepare", imgUrl: "https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif", handler: handleViewRecipeClick }
    ];

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
