const fs = require('fs');
const path = require('path');
const tinify = require("tinify");
tinify.key = "ji_oer2nT8KVdzjDftCr_LKnF-DS87Za";

fileDisplay(path.resolve(__dirname, "./")); 

function fileDisplay(filePath) {
	fs.readdir(filePath, function(err, files) {
		if (err) return console.error(err);
		files.forEach(function(filename) {
			var filedir = path.join(filePath, filename);
			fs.stat(filedir, function(eror, stats) {
				if (eror) return console.warn('获取文件stats失败');
				if (stats.isFile()) {
					if (/\.png$/i.test(filedir)) {
						tinyPng(filePath, filename);
					}
				} else if (stats.isDirectory()) {
					if (!/node_modules/.test(filedir)) {
						let newdir = filePath.replace(path.resolve(__dirname), path.resolve(__dirname, "../tinyPng"));
						if (!fs.existsSync(newdir)) fs.mkdirSync(newdir);
						fileDisplay(filedir);
					}
				}
			});
		});
	});
} 


function tinyPng(filePath, filename) {
	var filedir = path.join(filePath, filename);
	var source = tinify.fromFile(filedir);
	let newfiledir = filePath.replace(path.resolve(__dirname), path.resolve(__dirname, "../tinyPng")) + "\\" + filename;
	source.toFile(newfiledir);
}