import 'styles/styles.css';
import RouterConfig from './navigation/RouterConfig';
import { BrowserRouter } from 'react-router-dom';

/* import and use the recommended JoyUI font */
import '@fontsource/public-sans';

export default function App() {
	return (
		<div className='meal-ui-basekit-theme negative-space-scale'>
			<BrowserRouter>
				<RouterConfig />
			</BrowserRouter>
		</div>
	);
}
