import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCalendar, faBoxes, faGear } from '@fortawesome/free-solid-svg-icons'

export default function MinimalistSidebar() {
    return (
        <div className="sidebar-grid minimalist-sidebar">
            <div className="hero-branding-header content-column branding-row">
                <h1 className="hero-title">InMeal</h1>
            </div>
            <div className="content-column management-row">
                <button className="icon-btn primary-icon-btn" type="button">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <button className="icon-btn" type="button">
                    <FontAwesomeIcon icon={faCalendar} />
                </button>
                <button className="icon-btn" type="button">
                    <FontAwesomeIcon icon={faBoxes} />
                </button>
            </div>
            <div className="content-column settings-row">
                <button className="icon-btn" type="button">
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </div>
        </div>
    );
};