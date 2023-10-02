const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: look into suspense and dynamic imports
// https://react.dev/reference/react/lazy#suspense-for-code-splitting
// TODO: look at prefetching
// https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules
module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('prod')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/assets/index.html'),
            favicon: path.resolve(__dirname, 'src/assets/favicon.ico'),
            xhtml: true,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        })
    ]
};
