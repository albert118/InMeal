import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			// https://stackoverflow.com/a/68250175/9505707
			// relative impports are a pain with Vite
			{ find: '@', replacement: path.resolve(__dirname, 'src') }
		],
		extensions: ['.js', '.jsx']
	}
});
