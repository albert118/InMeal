const webpack = require('webpack')

// TODO: look into suspense and dynamic imports
// https://react.dev/reference/react/lazy#suspense-for-code-splitting
// TODO: look at prefetching
// https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules
module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('prod'),
        }),
    ],
}
