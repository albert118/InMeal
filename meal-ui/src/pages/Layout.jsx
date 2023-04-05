import { useState } from 'react';
import MinimalistSidebar from 'components/MinimalistSidebar';

const Layout = ({ children }) => {
	// control the toggle'able sidebar-heading
	// the initial state is falsy inactive, the animation begins after the first click
	const [isActive, setActive] = useState(false);
	const [isInActive, setInActive] = useState(null);

	const getClassNames = () => {
		const layoutClasses = 'scrollbar-vertical';

		return `${
			isActive ? `header-active ${layoutClasses}` : layoutClasses
		} ${isInActive ? `header-inactive ${layoutClasses}` : layoutClasses}`;
	};

	return (
		<div>
			<MinimalistSidebar
				isActive={isActive}
				setActive={setActive}
				isInActive={isInActive}
				setInActive={setInActive}
			/>
			<main className={getClassNames()}>{children}</main>
		</div>
	);
};

export default Layout;
