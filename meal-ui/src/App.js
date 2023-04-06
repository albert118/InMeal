import 'styles/styles.scss';
import RouterConfig from 'navigation/RouterConfig';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
	return (
		<div className='negative-space-scale'>
			<BrowserRouter>
				<RouterConfig />
			</BrowserRouter>
		</div>
	);
}
