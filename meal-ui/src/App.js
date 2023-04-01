import 'styles/styles.css';
import RouterConfig from './navigation/RouterConfig';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { mealUiDarkTheme, lightModernTheme } from 'styles/ThemeProvider';

export default function App() {
	return (
		<div className='meal-ui-basekit-theme negative-space-scale'>
			<ConfiguredProvider>
				<BrowserRouter>
					<RouterConfig />
				</BrowserRouter>
			</ConfiguredProvider>
		</div>
	);
}

function ConfiguredProvider(props) {
	return (
		<NextUIProvider heme={lightModernTheme}>
			{props.children}
		</NextUIProvider>
	);
}
