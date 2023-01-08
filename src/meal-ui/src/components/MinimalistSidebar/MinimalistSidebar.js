import React, { useState } from 'react';
import { faBars, faCalendar, faBoxes, faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import AppRoutes from 'navigation/AppRoutes';
import { IconButton } from 'components/Button';


const brandName = "in meal";

const AnimatedHamburger = props => {
    const { callback } = props;

    const handleClick = event => {
        event.preventDefault();
        callback();
    };

    return(
        <div className='hamburger' onClick={handleClick}>
            <div className='line1'></div>
            <div className='line2'></div>
            <div className='line3'></div>
        </div>
    );
};

export default function MinimalistSidebar() {
    const navigate = useNavigate();

    const handleDashboardClick = () => navigate(AppRoutes.root);
    const handleRecipeViewClick = () => navigate(AppRoutes.recipes);
    const handlePlanningClick = () => navigate(AppRoutes.planning);
    const handleSettingsClick = () => navigate(AppRoutes.settings);

    const [isActive, setActive] = useState(false);

    const toggleActive = () => setActive(!isActive);

    return (
        <div className={`minimalist-sidebar ${isActive ? "minimalist-sidebar-active": ""}`}>
            <div className="hero-branding-logo">
                <button type="button" onClick={handleDashboardClick}>
                    <h1 className="hero-title">{brandName}</h1>
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