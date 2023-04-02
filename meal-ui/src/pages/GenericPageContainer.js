import { createContext } from 'react';
import MinimalistSidebar from 'components/MinimalistSidebar';
import Footer from 'components/Navigation';

// create a generic context to inject data to children
const GenericContext = createContext();

const Layout = ({ className, children }) => {
	const genericContextProps = {};

	return (
		<div>
			<MinimalistSidebar />
			<main>
				<GenericContext.Provider value={genericContextProps}>
					{children}
				</GenericContext.Provider>
			</main>
			{/* <Footer className='footer-grid' /> */}
		</div>
	);
};

export default Layout;
export { GenericContext };
