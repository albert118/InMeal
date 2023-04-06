import { useNavigate } from 'react-router-dom';

import { faCalendar, faBoxes, faGear } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { AnimatedHamburger } from './AnimatedHamburger';
import { NavLinkItem } from './NavLinkItem';

import AppRoutes from 'navigation/AppRoutes';
import config from 'config';
import VersionInfo from 'VersionInfo';
import { HeroBrandingLogo } from './HeroBrandingLogo';

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

	return (
		<header
			className={`minimalist-sidebar
			 	${isActive ? 'minimalist-sidebar-active' : ''} 
				${isInActive ? 'minimalist-sidebar-inactive' : ''}`}
		>
			<HeroBrandingLogo
				config={config}
				onClick={() => navigate(AppRoutes.root)}
			/>
			<AnimatedHamburger callback={toggleActive} />
			<div className='nav-links'>
				<NavLinkItem
					isActive={isActive}
					icon={faCalendar}
					handler={() => navigate(AppRoutes.planning)}
				>
					Meal Planning
				</NavLinkItem>
				<NavLinkItem
					isActive={isActive}
					icon={faBoxes}
					handler={() => navigate(AppRoutes.recipes)}
				>
					Manage Recipes
				</NavLinkItem>

				<NavLinkItem
					isActive={isActive}
					icon={faGear}
					handler={() => navigate(AppRoutes.settings)}
				>
					Settings
				</NavLinkItem>
			</div>
			<div className='social-links'>
				<NavLinkItem
					isActive={isActive}
					icon={faGithub}
					handler={() => window.open(config.GitSocialLink, '_blank')}
				>
					release: {VersionInfo.toString()}
				</NavLinkItem>
			</div>
		</header>
	);
}
