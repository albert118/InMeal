import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, './src/'),
			components: `${path.resolve(__dirname, './src/components/')}`,
			navigation: `${path.resolve(__dirname, './src/navigation/')}`,
			styles: `${path.resolve(__dirname, './src/styles/')}`,
			public: `${path.resolve(__dirname, './public/')}`,
			pages: path.resolve(__dirname, './src/pages')

			// https://stackoverflow.com/a/68250175/9505707
			// relative impports are a pain with Vite
			// src: './src',
			// styles: './src/styles',
			// components: './src/components',
			// config: './src/config',
			// dataHooks: './src/dataHooks',
			// forms: './src/forms',
			// navigation: './src/navigation',
			// pages: './src/pages',
			// utils: './src/utils'
		}
	}
});
