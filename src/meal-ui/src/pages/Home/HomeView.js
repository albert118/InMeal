import React from 'react'

import MinimalistSidebar from 'components/MinimalistSidebar'
import Card from 'components/Card'
import Carousel from 'components/Carousel';

export default function HomeView() {
    const plannedItems = [
        { label: "Breakfast", status: "unprepared", imgUrl: "https://media.tenor.com/fokbHD7dZNUAAAAC/food-chinese.gif" },
        { label: "Lunch", status: "prepared", imgUrl: "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif"},
        { label: "Dinner", status: "unprepared", imgUrl: "https://bestanimations.com/media/food/1310335691frenchfries-animated-gif.gif" }
    ];

    const suggestedItems = [
        { label: "Breakfast bowl", status: "missing ingredients", imgUrl: "https://i.pinimg.com/originals/28/0e/bc/280ebc35f36d9571f08cd61ab422235d.gif" },
        { label: "Dessert Cake", status: "ready to prepare", imgUrl: "https://img.buzzfeed.com/buzzfeed-static/static/2015-06/23/3/enhanced/webdr13/anigif_enhanced-10889-1435044961-2.gif"},
        { label: "Bulking Shake", status: "ready to prepare", imgUrl: "https://64.media.tumblr.com/2b34471a440e97cd99f5728954238b3f/c4e6a303827cff2d-07/s540x810/fd32c1315bdfc4271b125bd417c999d4abb18126.gif" }
    ];

    return (
        <div className="p-home-view">
            <MinimalistSidebar />
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
