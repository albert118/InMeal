const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

module.exports = composePlugins(
    withNx({ skipTypeChecking: true }),
    withReact(),
    (config, { options, context }) => {
        config.mode = 'development';
        config.devtool = 'cheap-module-source-map';
        config.module = {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env'],
                                [
                                    '@babel/preset-react',
                                    { runtime: 'automatic' }
                                ]
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-syntax-dynamic-import'
                            ]
                        }
                    }
                }
            ]
        };

        config.devServer = {
            static: path.resolve(__dirname, 'src/assets'),
            open: true,
            compress: true,
            historyApiFallback: true,
            hot: true,
            proxy: {
                '/api': {
                    target: 'https =//localhost =7078',
                    secure: false
                }
            }
        };

        config.watchOptions = {
            ignored: ['**/node_modules/', '**/dist']
        };

        return config;
    }
);
