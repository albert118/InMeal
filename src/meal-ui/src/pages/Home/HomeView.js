import React from 'react'

import MinimalistSidebar from 'components/MinimalistSidebar'
import Card from 'components/Card'
import Carousel from 'components/Carousel';

export default function HomeView() {
    const items = [
        { content: "ABC", label: "Lunch", status: "prepared", imgUrl: "https://media.tenor.com/1TjGpMd7GEYAAAAC/stitch-dessert.gif"},
        { content: "123", label: "Dinner", status: "unprepared", imgUrl: "https://bestanimations.com/media/food/1310335691frenchfries-animated-gif.gif" }
    ];


    return (
        <div className="p-home-view">
            <MinimalistSidebar />
            <div className="hero-grid">
                <div className="hero-header">
                    <h1 className="hero-title">InMeal</h1>
                </div>
                <Card className="planning-quick-view" title="Upcoming...">
                    <Carousel items={items}/>
                </Card>
                <Card className="explore-quick-view" title="Something else?">
                    <Carousel items={items}/>
                </Card>
            </div>
        </div>
    );
};
