const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
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
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            }
        ]
    },
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
    }
});
