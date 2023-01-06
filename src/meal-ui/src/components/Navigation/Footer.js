import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = props => {
    const { className } = props;
    const classes = className 
        ? `hero-footer footer-grid ${className}` 
        : `hero-footer footer-grid`;

    const gitSocialLink = "https://github.com/albert118/InMeal";
    const versionInfo = "v0.1-alpha";

    const handleGitOnClick = () => window.location.href = gitSocialLink;

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
                release: {versionInfo}
            </div>
        </footer>
    );
};

export default Footer;