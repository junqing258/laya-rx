const fs = require('fs');
const path = require('path');
const async = require('async');
const child_process = require('child_process');
const chalk  = require('chalk');
const fsextra = require('fs-extra');


const exclude = ['js', 'libs', 'data', 'sounds', 'laya', '.rec', 'index.html', 'index_zsy.html'];

const root_path   = path.resolve(__dirname, '../');
const bin_path    = path.resolve(__dirname, '../bin');
const assets_path = path.resolve(__dirname, '../laya/assets');

const publish_dir = fs.readFileSync(root_path+'/publish/gamehall').toString();

let result = {}, last_result = {};
let atlas = [];
let unpack_json;


start();

async function start() {
	let asset_map = await getAtlas();
	let commit_id = await getCommitId();
	let last_commit_id = fs.readFileSync(bin_path+'/commint').toString();
	let diff_list;
	if (commit_id!=last_commit_id && last_commit_id!=='null' && last_commit_id!=='undefined') {
		diff_list = await getDiff(last_commit_id);
	}
	let commit_list = filterAsset(asset_map, diff_list);
	// console.log('commit list:\n', t.join('\n'));

	async.eachSeries(commit_list, (file_name, done)=> {
		try {
			fsextra.copySync(bin_path+'/'+file_name, publish_dir+file_name);
			console.log(chalk.green(`copy: ${file_name}`));
		} catch (err) {
			console.log(err);
		}
		done();
	}, err=> {
		fs.writeFile(bin_path+'/commint', commit_id, (err)=> {
			if (err) throw err;
			console.log(chalk.green(`commint id: ${commit_id}`));
		});
	});
	
}

function filterAsset(asset_map, diff_list) {
	let commit_list = [];
	if (!diff_list) {
		return convertAssetList(asset_map);
	}
	diff_list.forEach(item=> {
		if (asset_map[item] && asset_map[item].atlas) {
			let key = asset_map[item].key;
			commit_list.push(key+'.json', key+'.png');
		} else if (/^(laya\/)/.test(item)) {
			commit_list.push(item);
		}
	});
	return commit_list;
}

function convertAssetList(asset_map) {
	let asset_list = [];
	Object.keys(asset_map).forEach(item=> {
		let value = asset_map[item];
		if (!value.atlas) {
			asset_list.push(item);
		} else if (!asset_list.includes(item)) {
			let key = asset_map[item].key;
			asset_list.push(key+'.json', key+'.png');
		}
	});
	return asset_list;
}


async function getAtlas() {
	return new Promise((relove, reject)=> {
		let rec = fs.readFileSync(bin_path+'/.rec').toString().split('\n');

		let regD = /^D\ (.+)/;
		let regP = /^P\ (.+)\ (.+\.png)/;
		let regR = /^[A-Z]\ (.+)\ (.+\.png)/;

		let key, map = {};
		rec.forEach((str, i)=> {
			if (regD.test(str)) {
				key = regD.exec(str)[1];
			} else {
				let atlas = 0;
				let e = regP.exec(str);
				if (e) atlas = 1;
				else  e = regR.exec(str);
				if (e) {
					let name = `${key}/${e[2]}`;
					let v = e[1];
					map[name] = { atlas, v, key };
				}
			}
		});
		relove(map);
	});
}

async function getCommitId() {
	return new Promise((relove, reject)=> {
		let commint_id = '';
		let git_rev = child_process.spawn('git', ['rev-parse', '--short', 'HEAD']);
		git_rev.stdout.on('data', (data) => {
			data = String(data);
			commint_id = data.replace(/\n/, '').trim();
		});
		git_rev.stderr.on('data', reject);
		git_rev.on('close', (code)=> {
			relove(commint_id);
		});
	});
}

async function getDiff(last_commit_id) {
	return new Promise((relove, reject)=> {
		let diff_list;
		let git_diff = child_process.spawn('git', ['diff', last_commit_id, '--name-only']);
		git_diff.stdout.on('data', (data) => {
			diff_list = data.toString().split('\n');
			diff_list = diff_list.map(v=> v.trim());
		});
		git_diff.on('close', ()=> {
			relove(diff_list);
		});
	});
}

// unpack_json = JSON.parse( fs.readFileSync(`${bin_path}/unpack.json`) );

/* function fileDisplay(filePath, cb) {
	let files = fs.readdirSync(filePath);
	async.eachSeries(files, (filename, callback) => {
		if (exclude.includes(filename)) return callback();
		var filedir = path.join(filePath, filename);
		let stats = fs.statSync(filedir);
		if (stats.isFile()) {
			setVersion(filePath, filename).then(callback);
		} else if (stats.isDirectory()) {
			fileDisplay(filedir, callback);
		}
	}, cb);
} */

/* function setVersion(filePath, filename) {
	return new Promise(reslove => {
		let path_key = formatrRelative(path.relative(bin_path, filePath) + `\\${filename}`);
		result[path_key] = `${ path_key }${ last_commit }`;
		if (/\.(jpe?g|png)$/i.test(filename)) {
			let name = /(.*)\.(jpe?g|png)$/i.exec(filename)[1];
			let changed = false;
			let res = formatrRelative(path.relative(bin_path, filePath));
			if (fs.existsSync(`${filePath}/${name}.json`)) {
				let atlas_dir = (`${res}/${name}`);
				diff_list.find(changefile=> {
					if (changefile.match(`laya/assets/${ atlas_dir }`)) {
						changed = true;
					}
					return changed;
				});
			} else {
				diff_list.find(changefile=> {
					if (changefile.match(`laya/assets/${ res }`)) {
						changed = true;
					}
					return changed;
				});
			}
			if (changed) {
				result[path_key] = `${ path_key }${ commint_id }`;
			}
		}
		let filedir = path.join(filePath, filename);
		reslove();
	});
} */

function checkChange(filePath, filename) {
	// diff_list.find();
}


function formatrRelative(str) {
	return String(str).split(path.sep).join('/');
}