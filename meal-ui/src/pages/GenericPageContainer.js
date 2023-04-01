import { createContext } from 'react';
import MinimalistSidebar from 'components/MinimalistSidebar';
import Footer from 'components/Navigation';
import { Grid, Column } from '@carbon/react';
// create a generic context to inject data to children
const GenericContext = createContext();

const GenericPageContainer = ({ className, children }) => {
	const genericContextProps = {};

	return (
		<div className={className ? `p-page ${className}` : `p-page`}>
			<MinimalistSidebar />
			<Grid className='layout'>
				<Column
					className='layout__content'
					xlg={16}
					lg={16}
					md={8}
					sm={4}
				>
					<GenericContext.Provider value={genericContextProps}>
						{children}
					</GenericContext.Provider>
				</Column>
				<Column
					className='layout__footer'
					xlg={16}
					lg={16}
					md={8}
					sm={4}
				>
					<Footer className='footer-grid' />
				</Column>
			</Grid>
		</div>
	);
};

export default GenericPageContainer;
export { GenericContext };
