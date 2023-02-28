import { useState } from 'react';
import { faCalendar, faBoxes, faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import AppRoutes from 'navigation/AppRoutes';
import { AnimatedHamburger } from './AnimatedHamburger';
import config from 'config';
import { NavLinkItem } from './NavLinkItem';

export default function MinimalistSidebar() {
	const navigate = useNavigate();

	const handleDashboardClick = () => navigate(AppRoutes.root);
	const handleRecipeViewClick = () => navigate(AppRoutes.recipes);
	const handlePlanningClick = () => navigate(AppRoutes.planning);
	const handleSettingsClick = () => navigate(AppRoutes.settings);

	// the initial state is falsy inactive, the animation begins after the first click
	const [isActive, setActive] = useState(false);
	const [isInActive, setInActive] = useState(null);

	const toggleActive = () => {
		setActive(!isActive);
		setInActive(isActive);
	};

	return (
		<div
			className={`minimalist-sidebar ${
				isActive ? 'minimalist-sidebar-active' : ''
			} ${isInActive ? 'minimalist-sidebar-inactive' : ''}`}
		>
			<div className='hero-branding-logo'>
				<button
					type='button'
					onClick={handleDashboardClick}
				>
					<h1 className='hero-title'>{config.BrandName}</h1>
				</button>
			</div>
			<AnimatedHamburger callback={toggleActive} />
			<div
				className={
					isActive ? 'nav-links nav-links-active' : 'nav-links'
				}
			>
				<NavLinkItem
					isActive={isActive}
					icon={faCalendar}
					handler={handlePlanningClick}
				>
					Meal Planning
				</NavLinkItem>
				<NavLinkItem
					isActive={isActive}
					icon={faBoxes}
					handler={handleRecipeViewClick}
				>
					Manage Recipes
				</NavLinkItem>
			</div>
			<div className='setting-links'>
				<NavLinkItem
					isActive={isActive}
					icon={faGear}
					handler={handleSettingsClick}
				>
					Settings
				</NavLinkItem>
			</div>
		</div>
	);
}
