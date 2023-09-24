const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
	devtool: 'inline-source-map',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'assets/js/[name].[contenthash:8].js',
		publicPath: '/',
		clean: true
	},
	devServer: {
		static: './public',
		open: true,
		compress: true,
		historyApiFallback: true,
		proxy: {
			'/api': {
				target: 'https://localhost:7078',
				secure: false
			}
		}
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
				test: /\.svg$/i,
				use: ['@svgr/webpack']
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'static/media/[name].[hash:8].[ext]'
					}
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].[contenthash:8].css',
			chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css'
		}),
		// the %PUBLIC_URL% template variable create-react-app adds needs to be remove for this to work
		new HtmlWebpackPlugin({
			title: 'Development',
			template: path.resolve(__dirname, 'public/index.html'),
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
