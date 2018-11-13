const fs = require('fs');
const path = require('path');
const os = require('os');
const async = require('async');
const child_process = require('child_process');
const chalk = require('chalk');
const fsextra = require('fs-extra');

const RunConfig = {
    pngQualityLow: 55,
    pngQualityHigh: 75,
    jpgQuality: 85
};

exports.compressImage = function(filePath, tarPath) {
    if (/.*\.png$/.test(filePath)) {
        return compressPng(filePath, tarPath);
    } else if (/.*\.jpe?g$/.test(filePath)) {
        return compressPng(filePath, tarPath);
    } else {
        return new Promise((relove, reject) => relove());
    }
};

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
        shell.stdout.on('data', (data) => {});
        shell.stderr.on('data', reject);
        shell.on('close', (code) => {
           if (parseInt(code) != 0) {
				if (parseInt(code) == 99) {
					console.log('compress fail pic:', filePath, 'compressed quality not between ' + RunConfig.pngQualityLow + '-' + RunConfig.pngQualityHigh);
				} else {
					console.log('compress fail pic:', filePath, code);
				}
                fsextra.copySync(filePath, tarPath);
			}
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
            console.log('stderr:', data.toString());
            console.log('compress fail pic:', filePath);
        });
        shell.on('close', function(code) {
            relove(code);
        });
    });
}