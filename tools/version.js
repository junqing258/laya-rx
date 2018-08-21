const fs = require('fs');
const path = require('path');
const async = require('async');
const child_process = require('child_process');

const exclude = ["js", "libs", "data", "sounds", "laya", ".rec", "index.html", "index_zsy.html"];

const root_path = path.resolve(__dirname, "../");
const bin_path = path.resolve(__dirname, "../bin");
const assets_path = path.resolve(__dirname, "../laya/assets");

let result = {},
	last_result = {};
let atlas = [];
let unpack_json;

let commint_id = '';
let last_commit = '69f0d43';
let diff_list = [];

function getCommitId() {
	return new Promise((relove, reject) => {
		let git_rev = child_process.spawn('git', ['rev-parse', '--short', 'HEAD']);
		git_rev.stdout.on('data', (data) => {
			commint_id = String(data).replace(/\n/, '');
			console.log(`commint id: ${data}`);
		});
		git_rev.stderr.on('data', reject);
		git_rev.on('close', (code) => {
			relove(commint_id);
		});
	});
}

getCommitId().then(getDiff);
/*.then(code=> {
	fileDisplay(bin_path, err => {
		result['commint_id'] = commint_id;
		fs.writeFileSync(`${bin_path}/version.json`, JSON.stringify(result));
		console.log("complete");
	});
});*/



function getDiff() {
	return new Promise((relove, reject) => {
		let git_diff = child_process.spawn('git', ['diff', last_commit, '--name-only']);
		git_diff.stdout.on('data', (data) => {
			diff_list = data.toString().split('\n');
		});
		git_diff.on('close', () => {
			relove(diff_list);
		});
	});
}

unpack_json = JSON.parse(fs.readFileSync(`${bin_path}/unpack.json`));

function fileDisplay(file_path, cb) {
	let files = fs.readdirSync(file_path);
	async.eachSeries(files, (file_name, next) => {
		if (exclude.includes(file_name)) return next();
		let filedir = path.join(file_path, file_name);
		let stats = fs.statSync(filedir);
		if (stats.isFile()) {
			setVersion(file_path, file_name).then(next);
		} else if (stats.isDirectory()) {
			fileDisplay(filedir, next);
		}
	}, cb);
}

function setVersion(file_path, file_name) {
	return new Promise(reslove => {
		let path_key = formatRelative(path.relative(bin_path, file_path) + `\\${file_name}`);
		result[path_key] = `${ path_key }${ last_commit }`;
		if (/\.(jpe?g|png)$/i.test(file_name)) {
			let name = /(.*)\.(jpe?g|png)$/i.exec(file_name)[1];
			let changed = false;
			let res = formatRelative(path.relative(bin_path, file_path));
			if (fs.existsSync(`${file_path}/${name}.json`)) {
				let atlas_dir = (`${res}/${name}`);
				diff_list.find(diff_name => {
					if (diff_name.match(`laya/assets/${ atlas_dir }`)) {
						changed = true;
					}
					return changed;
				});
			} else {
				diff_list.find(diff_name => {
					if (diff_name.match(`laya/assets/${ res }`)) {
						changed = true;
					}
					return changed;
				});
			}
			if (changed) {
				result[path_key] = `${ path_key }${ commint_id }`;
			}
		}
		let filedir = path.join(file_path, file_name);
		reslove();
	});
}

function checkChange(file_path, file_name) {
	// diff_list.find();
}


function formatRelative(str) {
	return String(str).split(path.sep).join('/');
}