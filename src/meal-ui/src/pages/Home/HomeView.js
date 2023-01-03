import React from 'react'

import MinimalistSidebar from 'components/MinimalistSidebar'
import Card from 'components/Card'
import Carousel from 'components/Carousel';

export default function HomeView() {
    const items = [
        { content: "ABC", label: "Lunch", status: "prepared" },
        { content: "123", label: "Dinner", status: "unprepared" }
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
                    <div>#1</div>
                    <div>#2</div>
                    <div>#3</div>
                </Card>
            </div>
        </div>
    );
};
