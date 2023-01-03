import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function MinimalistSidebar() {
    return (
        <div className="minimalist-sidebar">
            <button className="sidebar-toggle-btn" type="button">
                <FontAwesomeIcon icon={faBars} />
            </button>
            <p>#1</p>
            <p>#2</p>
            <p>#3</p>
        </div>
    );
};