const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

// TODO: look into suspense and dynamic imports
// https://react.dev/reference/react/lazy#suspense-for-code-splitting
// TODO: look at prefetching
// https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules
module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/assets/index.html'),
            favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
            xhtml: true,
            inject: true,
            minify: true
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            // extract node modules to their own vendor chunk
            cacheGroups: {
                vender: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
});
