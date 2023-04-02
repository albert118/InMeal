import { useState } from 'react';
import MinimalistSidebar from 'components/MinimalistSidebar';

const Layout = ({ children }) => {
	// control the toggle'able sidebar-heading
	// the initial state is falsy inactive, the animation begins after the first click
	const [isActive, setActive] = useState(false);
	const [isInActive, setInActive] = useState(null);

	return (
		<div>
			<MinimalistSidebar
				isActive={isActive}
				setActive={setActive}
				isInActive={isInActive}
				setInActive={setInActive}
			/>
			<main
				className={`${isActive ? 'header-active' : ''} ${
					isInActive ? 'header-inactive' : ''
				}`}
			>
				{children}
			</main>
		</div>
	);
};

export default Layout;
