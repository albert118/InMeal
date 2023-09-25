const webpack = require('webpack');

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	devServer: {
		static: path.resolve(__dirname, 'src/assets'),
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
	plugins: [
		new webpack.DefinePlugin({
			'process.env.name': JSON.stringify('dev')
		})
	]
};
