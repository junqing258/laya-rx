const path = require('path');
const os = require('os');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const webpackDevServer = require('webpack-dev-server');
const localServer = require('./server/index');


const env = process.env.NODE_ENV || 'development';
const definePlugin = new webpack.DefinePlugin({
    __DEV__: env !== "production"
});

var plugins = [
    definePlugin,
    new WebpackNotifierPlugin()
];

/**************************************************************************************************************************
 **
 */
module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: [path.resolve(__dirname, 'src/main.js')]
    },
    devtool: 'source-map',
    output: {
        pathinfo: false,
        path: path.resolve(__dirname, './bin'),
        filename: 'js/bundle.js'
    },
    watch: env !== "production",
    optimization: {
        // minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                // test: /js\/.*\.js($|\?)/i,
                sourceMap: false,
                warningsFilter: false,
                uglifyOptions: {
                    warnings: false,
                    comments: false,
                    keep_classnames: true,
                    keep_fnames: true,
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    },
    plugins: plugins,
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }]
    },
    devServer: {
        hot: false,
        host: (function() {
            let wlan = os.networkInterfaces()['WLAN'];
            // if (wlan) return wlan[1]['address'];
            // else return null;
        })(),
        disableHostCheck: true,
        contentBase: "./bin/",
        before: function(app) {
            localServer(app);
        }
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ],
        alias: {

        }
    }
};