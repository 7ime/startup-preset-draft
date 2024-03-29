const merge = require('webpack-merge')

const {resolvePath} = require('./tools/helpers')
const commonConfig = require('./common.config')
const paths = require('./tools/paths')
const plugins = require('./tools/plugins')

const port = '8081'
const mode = 'development'
process.env.NODE_ENV = mode

module.exports = function (webpackEnv, argv) {
    return merge(commonConfig, {
        mode,
        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js'
        },
        plugins: [
            plugins.htmlWebpackPlugin({
                minify: false
            })
        ],
        devServer: {
            host: '0.0.0.0',
            public: require('ip').address() + ':' + port,
            contentBase: resolvePath(paths.source),
            port,
            hot: true,
            open: true,
            index: 'index.html',
            watchContentBase: true,
            historyApiFallback: true,
            watchOptions: {
                ignored: /node_modules/
            },
            proxy: {
                '/api': 'http://localhost:8080',
            }
        },
        devtool: 'inline-source-map',
        target: 'web',
    })
}
