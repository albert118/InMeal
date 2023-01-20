import 'styles/styles.css';
import RouterConfig from './navigation/RouterConfig';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
	// const useHttpOptions = Object.freeze({
	//   cachePolicy: "no-cache"
	// });

	// const backendApiUri = "https://localhost:7078/api";

	return (
		<div className='meal-ui-basekit-theme negative-space-scale'>
			<BrowserRouter>
				<RouterConfig />
			</BrowserRouter>
		</div>
	);
}
