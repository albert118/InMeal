import React, { useState } from 'react';
import { faCalendar, faBoxes, faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import AppRoutes from 'navigation/AppRoutes';
import { IconButton } from 'components/Button';
import { AnimatedHamburger } from './AnimatedHamburger';
import config from 'Config';


export default function MinimalistSidebar() {
    const navigate = useNavigate();

    const handleDashboardClick = () => navigate(AppRoutes.root);
    const handleRecipeViewClick = () => navigate(AppRoutes.recipes);
    const handlePlanningClick = () => navigate(AppRoutes.planning);
    const handleSettingsClick = () => navigate(AppRoutes.settings);

    // the initial state is falsy inactive, the animation begins after the first click
    const [isActive, setActive] = useState(false);
    const [isInActive, setInActive] = useState(null);

    const toggleActive = () => {
        setActive(!isActive);
        setInActive(isActive);
    };

    return (
        <div className={`minimalist-sidebar ${isActive ? "minimalist-sidebar-active" : ""} ${isInActive ? "minimalist-sidebar-inactive" : ""}`}>
            <div className="hero-branding-logo">
                <button type="button" onClick={handleDashboardClick}>
                    <h1 className="hero-title">{config.BrandName}</h1>
                </button>
            </div>
            <AnimatedHamburger callback={toggleActive}/>
            <div className="nav-links">
                {/* <IconButton faIcon={faBars} handler={handleDashboardClick} isPrimary={true} /> */}
                <IconButton faIcon={faCalendar} handler={handlePlanningClick} />
                <IconButton faIcon={faBoxes} handler={handleRecipeViewClick} />
            </div>
            <div className="setting-links">
                <IconButton faIcon={faGear} handler={handleSettingsClick} />
            </div>
        </div>
    );
};