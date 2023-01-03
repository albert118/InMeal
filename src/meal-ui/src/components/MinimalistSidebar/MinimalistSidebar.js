import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCalendar, faBoxes, faGear } from '@fortawesome/free-solid-svg-icons'

export default function MinimalistSidebar() {
    return (
        <div className="minimalist-sidebar">
            <div className="top">
                <button className="btn primary-btn" type="button">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <button className="btn" type="button">
                    <FontAwesomeIcon icon={faCalendar} />
                </button>
                <button className="btn" type="button">
                    <FontAwesomeIcon icon={faBoxes} />
                </button>
            </div>


            <div className="bottom">
                <button className="btn" type="button">
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </div>
        </div>
    );
};