import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
    faBoxes,
    faSeedling,
    faSquarePlus
} from '@fortawesome/free-solid-svg-icons';
import VersionInfo from 'VersionInfo';
import config from 'config';
import AppRoutes from 'navigation/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { AnimatedHamburger } from './AnimatedHamburger';
import { HeroBrandingLogo } from './HeroBrandingLogo';
import { NavLinkItem } from './NavLinkItem';

export default function MinimalistSidebar({
    isActive,
    setActive,
    isInActive,
    setInActive
}) {
    const navigate = useNavigate();

    const toggleActive = () => {
        setActive(!isActive);
        setInActive(isActive);
    };

    function onClick(event) {
        event.preventDefault();
        toggleActive();
    }

    return (
        <header
            className={`minimalist-sidebar
			 	${isActive ? 'minimalist-sidebar-active' : ''} 
				${isInActive ? 'minimalist-sidebar-inactive' : ''}`}
        >
            <div className='top-section'>
                {/* neater sidebar if the branding appears when expanded */}
                {isActive && (
                    <HeroBrandingLogo
                        config={config}
                        onClick={() => {
                            isActive && toggleActive();
                            navigate(AppRoutes.root);
                        }}
                    />
                )}
                <AnimatedHamburger isActive={isActive} onClick={onClick} />
            </div>

            <div className='nav-links page-links'>
                <NavLinkItem
                    isActive={isActive}
                    icon={faSeedling}
                    onClick={() => {
                        isActive && toggleActive();
                        navigate(AppRoutes.ingredients);
                    }}
                >
                    view ingredients
                </NavLinkItem>
                <NavLinkItem
                    isActive={isActive}
                    icon={faBoxes}
                    onClick={() => {
                        isActive && toggleActive();
                        navigate(AppRoutes.recipes);
                    }}
                >
                    manage Recipes
                </NavLinkItem>
                <NavLinkItem
                    isActive={isActive}
                    icon={faSquarePlus}
                    onClick={() => {
                        isActive && toggleActive();
                        navigate(`${AppRoutes.recipe}/add`);
                    }}
                >
                    add a new recipe
                </NavLinkItem>
            </div>
            <div className='nav-links social-links'>
                <NavLinkItem
                    isActive={isActive}
                    icon={faGithub}
                    onClick={() => {
                        isActive && toggleActive();
                        window.open(config.GitSocialLink, '_blank');
                    }}
                >
                    release: {VersionInfo.toString()}
                </NavLinkItem>
            </div>
        </header>
    );
}
