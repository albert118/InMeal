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
    module: {
        rules: [
            ////////////////////////////
            // JSX (React)
            ////////////////////////////
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-react', { runtime: 'automatic' }]
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-syntax-dynamic-import',
                            [
                                'transform-react-remove-prop-types',
                                {
                                    removeImport: true
                                }
                            ],
                            '@babel/plugin-transform-react-inline-elements',
                            '@babel/plugin-transform-react-constant-elements'
                        ]
                    }
                }
            }
        ]
    },
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
