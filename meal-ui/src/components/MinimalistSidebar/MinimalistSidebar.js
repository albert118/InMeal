import { useNavigate } from 'react-router-dom';
import { faSeedling, faBoxes } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { AnimatedHamburger } from './AnimatedHamburger';
import { NavLinkItem } from './NavLinkItem';
import { HeroBrandingLogo } from './HeroBrandingLogo';
import AppRoutes from 'navigation/AppRoutes';
import config from 'config';
import VersionInfo from 'VersionInfo';

export default function MinimalistSidebar({ isActive, setActive, isInActive, setInActive }) {
	const navigate = useNavigate();

	const toggleActive = () => {
		setActive(!isActive);
		setInActive(isActive);
	};

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
						onClick={() => navigate(AppRoutes.root)}
					/>
				)}
				<AnimatedHamburger callback={toggleActive} />
			</div>

			<div className='nav-links page-links'>
				<NavLinkItem
					isActive={isActive}
					icon={faSeedling}
					onClick={() => navigate(AppRoutes.ingredients)}
				>
					View Ingredients
				</NavLinkItem>
				<NavLinkItem
					isActive={isActive}
					icon={faBoxes}
					onClick={() => navigate(AppRoutes.recipes)}
				>
					Manage Recipes
				</NavLinkItem>
			</div>
			<div className='nav-links social-links'>
				<NavLinkItem
					isActive={isActive}
					icon={faGithub}
					onClick={() => window.open(config.GitSocialLink, '_blank')}
				>
					release: {VersionInfo.toString()}
				</NavLinkItem>
			</div>
		</header>
	);
}
