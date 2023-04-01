import 'styles/styles.css';
import RouterConfig from './navigation/RouterConfig';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { mealUiTheme } from 'ThemeProvider';

export default function App() {
	return (
		<div className='meal-ui-basekit-theme negative-space-scale'>
			<NextUIProvider them={mealUiTheme}>
				<BrowserRouter>
					<RouterConfig />
				</BrowserRouter>
			</NextUIProvider>
		</div>
	);
}
