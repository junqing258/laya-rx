const path = require('path');
const os = require('os');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const webpackDevServer = require('webpack-dev-server');
const localServer = require('./server/index');


var env = process.env.NODE_ENV || 'development';

var definePlugin = new webpack.DefinePlugin({
    __DEV__: env!=="production"
});

var plugins = [
    definePlugin,
    new WebpackNotifierPlugin()
];


var plugins2 = [
    new webpack.optimize.UglifyJsPlugin({
        drop_console: true,
        compress: false,
        mangle: false,
        output: {
            comments: false,
        },
        beautify: false,
        sourceMap: true,
        test: /js\/.*\.js($|\?)/i
    })
];

/* if (process.env.NODE_ENV === 'devserver') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
} */
if (process.env.NODE_ENV === 'production') {
    plugins = plugins.concat(plugins2);
}

/**************************************************************************************************************************
 **
 */
module.exports = {
    entry: {
        app: [  path.resolve(__dirname, 'src/main.js') ]
    },
    devtool: 'source-map',
    output: {
        pathinfo: false,
        path: path.resolve(__dirname, './bin'), 
        filename: 'js/bundle.js'
    },
    watch:  env!=="production",
    plugins: plugins,
    module: {
        rules: [ { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') } ]
    },
    devServer: {
        hot: false,
        host: (function() {
            let wlan = os.networkInterfaces()['WLAN'];
            if (wlan) return wlan[1]['address'];
            else return null;
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