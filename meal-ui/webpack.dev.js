const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        static: path.resolve(__dirname, 'src/assets'),
        open: true,
        compress: true,
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'https://localhost:7078',
                secure: false
            }
        }
    },
    watchOptions: {
        // save some CPU when watching by ignoring the node modules
        ignored: ['**/node_modules/', '**/dist']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('dev')
        })
    ]
};
