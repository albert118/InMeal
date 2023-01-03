import React from 'react';


export default function HomeView() {
    return (
        <div className="p-home-view">
            <div className="minimalist-sidebar">
                <p>#1</p>
                <p>#2</p>
                <p>#3</p>
            </div>
            <div className="hero-grid">
                <div className="hero-header">
                    <h1 className="hero-title">InMeal</h1>
                </div>
                <div className="planning-quick-view" />
                <div className="explore-quick-view" />
            </div>
        </div>
    );
};
