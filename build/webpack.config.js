var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    name: 'vueFooter',
    output: {
        path: './dist',
        publicPath: '/dist/',
        filename: 'phaser-app.js'
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }, 
        {
            test: /\.s[a|c]ss$/,
            loader: 'style!css!sass'
        }
        {
            test: /\.js$/,
            exclude: /node_modules|\/dist/,
            loader: 'babel'
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader'
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime', 'lodash', 'add-module-exports']
    }
}
module.exports.plugins = [
    new ExtractTextPlugin(module.exports.output.filename.replace(/\.js$/, '.css')),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
]
module.exports.devtool = '#source-map'
