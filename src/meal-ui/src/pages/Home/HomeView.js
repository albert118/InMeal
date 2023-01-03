import React from 'react'

import MinimalistSidebar from 'components/MinimalistSidebar'
import Card from 'components/Card'

export default function HomeView() {
    return (
        <div className="p-home-view">
            <MinimalistSidebar />
            <div className="hero-grid">
                <div className="hero-header">
                    <h1 className="hero-title">InMeal</h1>
                </div>
                <Card className="planning-quick-view" title="Upcoming...">
                    <div>X</div>
                    <div>Y</div>
                    <div>Z</div>
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
