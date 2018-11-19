const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const express = require('express');
const webpack = require('webpack');
const webpack_config_func = require('../webpack.config');

// var args = process.argv.splice(2);

const socket = require('./socket');

const LIVE_PORT = 35729;

let start_server = false;

let webpack_config = webpack_config_func('development', { mode: 'development' });
/* webpack_config.output = {
    // path: '/bin',
    filename: 'js/[name].js',
    publicPath: 'http://169.254.144.238:8000/bin/'
}; */
const compiler = webpack(webpack_config);
compiler.watch({
    aggregateTimeout: 500,
    poll: undefined
}, (err, stats) => {
    console.log('watching:', stats.toJson('minimal'));
    if (!start_server) {
        start_server = true;
        start();
    }
});

function start() {
    let socket_start = false;

    const app = express();
    
    const livereload = require('easy-livereload');
    app.use(livereload({
        watchDirs: [
            path.join(__dirname, '../bin/res'),
            path.join(__dirname, '../bin/assets'),
            path.join(__dirname, '../bin/js'),
            // path.join(__dirname, '../src/ui')
        ],
        checkFunc: function(file) {
            return true;
        },
        port: LIVE_PORT
	}));
	
	app.use(express.static('./', {
        dotfiles: 'ignore',
        index: false,
        extensions: ['html'],
        setHeader: (res, path, stat) => {

        }
    }));


    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        res.header('X-Powered-By', 'PLANET');
        next();
    });

    app.get('/', (req, res, next) => {
        if (req.query.act) {
            let data = fs.readFileSync(path.resolve(__dirname, './data/success.json')).toString();
            res.json(JSON.parse(data));
        } else {
            res.redirect('/bin/?id=3&debug_status=1');
        }
    });

    app.get('/bin', (req, res, next) => {
        if (!req.query || !req.query.id) {
            res.header('charset', 'utf-8');
            res.send('<h2>需要用户id</h2>');
            return;
        }
        if (req.query.p) socket(app);
		res.type('html');
		let html = fs.readFileSync(path.resolve(__dirname, '../bin/index.html')).toString();
		html = html.replace('<!--server--tag-->', `<script src="http://${req.hostname}:${LIVE_PORT}/livereload.js"></script>`);
        res.send(html);
    });

    app.listen(8000, () => console.log('Open URL:', 'http://localhost:8000/'));

}