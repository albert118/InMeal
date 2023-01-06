import React from 'react';
import { faBars, faCalendar, faBoxes, faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import AppRoutes from 'navigation/AppRoutes';
import { IconButton } from 'components/Button';

export default function MinimalistSidebar() {
    const navigate = useNavigate();

    const handleDashboardClick = () => navigate(AppRoutes.root);
    const handleRecipeViewClick = () => navigate(AppRoutes.recipe);


    return (
        <div className="sidebar-grid minimalist-sidebar">
            <div className="hero-branding-header content-column branding-row">
                <button type="button" onClick={handleDashboardClick}>
                    <h1 className="hero-title">InMeal</h1>
                </button>
            </div>
            <div className="content-column management-row">
                <IconButton faIcon={faBars} handler={handleDashboardClick} isPrimary={true} />
                <IconButton faIcon={faCalendar} />
                <IconButton faIcon={faBoxes} handler={handleRecipeViewClick} />
            </div>
            <div className="content-column settings-row">
                <button className="icon-btn" type="button">
                    <IconButton faIcon={faGear} />
                </button>
            </div>
        </div>
    );
};