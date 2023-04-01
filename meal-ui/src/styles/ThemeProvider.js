import { createTheme } from '@nextui-org/react';

export const mealUiDarkTheme = createTheme({
	type: 'dark',
	theme: {
		colors: {
			// // brand colours
			primaryDark: 'var(--dove-grey)',
			primaryLightHover: '--dove-grey',
			primaryLightActive: '--dove-grey',
			nextUIColorsPrimary: '--lynx-white',
			primaryBorder: '--lynx-white',
			primaryBorderHover: '--lynx-white',
			primarySolidHover: '--lynx-white',
			primarySolidContrast: '--lynx-white',
			primaryShadow: '--lynx-white',
			gradient:
				'linear-gradient(to right, var(--lynx-white), rgba(255,0,0,0))',
			link: '--note'
		}
	}
});

export const lightModernTheme = createTheme({
	type: 'light',
	className: 'light-modern',
	theme: {
		colors: {
			primary: '#7928CA',
			primaryLight: '#d9c2f0',
			success: '#FF1CF7'
		}
	}
});
