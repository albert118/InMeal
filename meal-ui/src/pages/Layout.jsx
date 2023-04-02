import MinimalistSidebar from 'components/MinimalistSidebar';
import Footer from 'components/Navigation';

const Layout = ({ children }) => {
	return (
		<div>
			<MinimalistSidebar />
			<main>{children}</main>
			{/* <Footer className='footer-grid' /> */}
		</div>
	);
};

export default Layout;
