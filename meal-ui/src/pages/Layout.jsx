import { useState } from 'react';
import MinimalistSidebar from 'components/MinimalistSidebar';
import ThemingGradient from 'assets/theming-gradient.svg';

export default function Layout({ children }) {
	// control the toggle'able sidebar-heading
	// the initial state is falsy inactive, the animation begins after the first click
	const [isActive, setActive] = useState(false);
	const [isInActive, setInActive] = useState(null);

	const getClassNames = () => {
		return `${isActive ? 'header-active' : ''} ${isInActive ? 'header-inactive' : ''}`;
	};

	return (
		<div>
			<MinimalistSidebar
				isActive={isActive}
				setActive={setActive}
				isInActive={isInActive}
				setInActive={setInActive}
			/>
			<img
				className='theming-gradient-1'
				alt='theming-gradient-1'
				src={ThemingGradient}
			/>
			<img
				className='theming-gradient-2'
				alt='theming-gradient-2'
				src={ThemingGradient}
			/>
			<main className={getClassNames()}>{children}</main>
		</div>
	);
}
