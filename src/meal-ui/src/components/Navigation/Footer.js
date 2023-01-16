import React, { version } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import config from 'Config';
import VersionInfo from 'VersionInfo';

const Footer = props => {
    const { className } = props;
    const classes = className 
        ? `hero-footer footer-grid ${className}` 
        : `hero-footer footer-grid`;

    const handleGitOnClick = () => window.open(config.GitSocialLink, '_blank');

    return(
        <footer className={classes}>
            <div className="footer-content">
                <button 
                    className="icon-btn" 
                    type="button"
                    onClick={handleGitOnClick}
                >
                    <FontAwesomeIcon icon={faGithub} />
                </button>
                release: {VersionInfo.toString()}
            </div>
        </footer>
    );
};

export default Footer;