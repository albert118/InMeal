import 'styles/styles.scss';
import RouterConfig from 'navigation/RouterConfig';
import { BrowserRouter } from 'react-router-dom';

// move to newer data router pattern, https://reactrouter.com/en/main/routers/picking-a-router
// allows implementing the useFetcher approach with react-router (simplifies the data layer)
export default function App() {
	return (
		<div>
			<BrowserRouter>
				<RouterConfig />
			</BrowserRouter>
		</div>
	);
}
