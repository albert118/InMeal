import { createContext } from 'react';
import MinimalistSidebar from 'components/MinimalistSidebar';
import Footer from 'components/Navigation';

// create a generic context to inject data to children
const GenericContext = createContext();

const GenericPageContainer = ({ className, children }) => {
	const genericContextProps = {};

	return (
		<div className={className ? `p-page ${className}` : `p-page`}>
			<MinimalistSidebar />
			<GenericContext.Provider value={genericContextProps}>
				{children}
			</GenericContext.Provider>
			<Footer className='footer-grid' />
		</div>
	);
};

export default GenericPageContainer;
export { GenericContext };
