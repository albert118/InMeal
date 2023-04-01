import { createTheme } from '@nextui-org/react';

export const mealUiTheme = createTheme({
	type: 'dark',
	theme: {
		// brand colours
		primaryLight: '--dove-grey',
		primaryLightHover: '--dove-grey',
		primaryLightActive: '--dove-grey',
		primary: '--lynx-white',
		primaryBorder: '--lynx-white',
		primaryBorderHover: '--lynx-white',
		primarySolidHover: '--lynx-white',
		primarySolidContrast: '--lynx-white',
		primaryShadow: '--lynx-white',

		gradient:
			'linear-gradient(to right, var(--lynx-white), rgba(255,0,0,0))',

		link: '--note'
	},
	space: {},
	fonts: {}
});
