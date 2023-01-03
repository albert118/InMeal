import React from 'react';
import MinimalistSidebar from 'components/MinimalistSidebar';

export default function HomeView() {
    return (
        <div className="p-home-view">
            <MinimalistSidebar />
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
