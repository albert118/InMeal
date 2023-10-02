const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'assets/js/[name].[contenthash:8].js',
		clean: true
	},
	module: {
		rules: [
			////////////////////////////
			// JSX (React)
			////////////////////////////
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			////////////////////////////
			// SCSS / SASS
			////////////////////////////
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			////////////////////////////
			// images
			////////////////////////////
			{
				test: /\.svg$/,
				type: 'asset/resource',
				use: 'file-loader',
				generator: {
					outputPath: 'assets/images/'
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				type: 'asset/resource',
				generator: {
					outputPath: 'assets/images/'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/assets/index.html'),
			favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
			xhtml: true,
			inject: true
		})
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			assets: path.resolve(__dirname, 'src/assets'),
			components: path.resolve(__dirname, 'src/components'),
			config: path.resolve(__dirname, 'src/config'),
			forms: path.resolve(__dirname, 'src/forms'),
			hooks: path.resolve(__dirname, 'src/hooks'),
			navigation: path.resolve(__dirname, 'src/navigation'),
			pages: path.resolve(__dirname, 'src/pages'),
			styles: path.resolve(__dirname, 'src/styles'),
			types: path.resolve(__dirname, 'src/types'),
			utils: path.resolve(__dirname, 'src/utils'),
			VersionInfo: path.resolve(__dirname, 'src/VersionInfo.js'),
			// demo image for prototyping purposes
			DemoImage: path.resolve(__dirname, 'src/DemoImage.js')
		}
	}
};
