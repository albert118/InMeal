const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: 'assets'
	},
	module: {
		rules: [
			////////////////////////////
			// JSX (React)
			////////////////////////////
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						cacheCompression: false,
						envName: 'development'
					}
				}
			},
			////////////////////////////
			// SCSS / SASS
			////////////////////////////
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					// handles files such as splide.min.css
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					}
				]
			},
			////////////////////////////
			// SVGs and image content
			////////////////////////////
			{
				test: /\.svg$/,
				use: ['@svgr/webpack']
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].[contenthash:8].css',
			chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
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
