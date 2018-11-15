const fs = require('fs');
const path = require('path');
const os = require('os');
const async = require('async');
const child_process = require('child_process');
const chalk = require('chalk');
const fsextra = require('fs-extra');


// const { getAtlas } = require('../publish/res');

const RunConfig = {
    pngQualityLow: 45,
    pngQualityHigh: 80,
    jpgQuality: 85
};

const root_path = path.resolve(__dirname, '../');
const bin_path = path.resolve(__dirname, '../bin/');
const atlas_dir = '';
const rec_path = bin_path + '/' + atlas_dir + '.rec';
const ui_dir = 'src/ui/layaUI.max.all.js';
const suffix = 'json';
const publish_dir = fs.readFileSync(root_path + '/publish/gamehall/').toString();
const publish_app_dir = publish_dir + '/www/files/game/deepseaglory/';


start();

async function start() {
    let asset_map = await getAtlas();
    let asset_list = convertAssetList(asset_map);

    async.eachSeries(asset_list, (item, next) => {
        let { act, name, type } = item;
        let type_str = type ? `${atlas_dir}` : '';
        let p = `${type_str}${name}`;

        let filePath = path.resolve(`${bin_path}/${p}`);
        let tarPath = path.resolve(`${publish_app_dir}/${p}`);
        if (/.*\.png$/.test(filePath)) {
            // compressPng(filePath, tarPath).then(next);
            next();
        } else if (/.*\.jpe?g$/.test(filePath)) {
            compressJpg(filePath, tarPath).then(next);
        } else {
            next();
        }
    });
}

function convertAssetList(asset_map) {
    let asset_list = [];
    let asset_temp = [];
    Object.keys(asset_map).forEach(name => {
        let value = asset_map[name];
        let { type } = value;
        let act = 'A';
        if (!type) {
            asset_list.push({ act, name, type });
        } else {
            name = asset_map[name].key + '.png';
            if (!asset_temp.includes(name)) {
                asset_temp.push(name);
                asset_list.push({ act, name, type });
                // asset_list.push({ act, name: `${key}.${suffix}`, type });
            }
        }
    });
    return asset_list;
}
// compressPng('bin/res/active.png', 'D:/Users/Public/Git/bin/res/active.png');
// compressJpg('bin/assets/map/4/bg.jpg', 'D:/Users/Public/Git/bin/bg.jpg');


async function compressPng(filePath, tarPath) {
    return new Promise((relove, reject) => {
        // let exePath = path.join(os.platform()==='win32' ? 'pngquant.exe': 'pngquant');
        let exePath = path.resolve(__dirname, 'pngquant.exe');
        let params = ['--strip', '--force'];
        params.push('--skip-if-larger');
        params.push('--quality=' + [RunConfig.pngQualityLow, RunConfig.pngQualityHigh].join('-'));
        params.push('--output', tarPath);
        params.push(filePath);

        let shell = child_process.spawn(exePath, params);
        shell.stdout.on('data', data => {});
        shell.stderr.on('data', data=> {
            console.log(chalk.red('stderr:', String(data)));
            reject();
        });
        shell.on('close', (code, msg) => {
           if (parseInt(code) != 0) {
				console.log(chalk.red('compress fail:', filePath, code, msg));
                fsextra.copySync(filePath, tarPath);
                relove();
			} else {
				console.log(chalk.green(`compress success: ${filePath}`));
            }
            relove();
        });
    });
}



async function compressJpg(filePath, tarPath) {
    return new Promise((relove, reject) => {
        let exePath = path.resolve(__dirname, 'guetzli_windows_x86.exe');
        var params = ['--quality', RunConfig.jpgQuality];
        params.push(filePath, tarPath);

        var shell = child_process.spawn(exePath, params);
        shell.stdout.on('data', function(data) {
            console.log('stdout:', data.toString());
        });
        shell.stderr.on('data', function(data) {
            console.log(chalk.red('compress fail:', filePath, "\n"+data.toString()));
        });
        shell.on('close', function(code) {
            relove(code);
        });
    });
}

async function getAtlas() {
    return new Promise((relove, reject) => {
        let rec = fs.readFileSync(rec_path).toString().split('\n');

        let reg_d = /^D\ (.+)/,
            reg_p = /^P\ (.+)\ (.+\.png)/,
            reg_r = /^[A-Z]\ (.+)\ (.+\.png|.+\.jpe?g)/;
        let key, map = {};
        rec.forEach((str, i) => {
            if (reg_d.test(str)) {
                key = reg_d.exec(str)[1];
            } else if (str) {
                let type = 0;
                let result = reg_p.exec(str);
                if (result) type = 1;
                else result = reg_r.exec(str);
                if (result) {
                    let name = `${key}/${result[2]}`;
                    let v = result[1];
                    map[name] = { type, v, key };
                }
            }
        });
        relove(map);
    });
}