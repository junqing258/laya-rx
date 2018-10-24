const fs = require('fs');
const path = require('path');
const async = require('async');
const child_process = require('child_process');
const chalk = require('chalk');
const fsextra = require('fs-extra');

const root_path = path.resolve(__dirname, '../');
const bin_path = path.resolve(__dirname, '../bin/');
const atlas_dir = 'res/atlas/';
const rec_path = bin_path + '/' + atlas_dir + '.rec';
const suffix = 'atlas';

const publish_dir = fs.readFileSync(root_path + '/gamehall').toString();

start();

async function start() {
	let asset_map = await getAtlas();
	let commit_id = await getCommitId();
	let last_commit_id = await getLastCommitId().catch(e=> {
		// console.log(e);
	});

	let diff_list = [];
	if (last_commit_id) {
		diff_list = await getDiff(last_commit_id);
	}
	let commit_list = filterAsset(asset_map, diff_list);

	async.eachSeries(commit_list, (item, done)=> {
		let { type, name, atlas } = item;
		let atlas_str = atlas ? `${atlas_dir}` : '';
		let p = `${atlas_str}${name}`;
		switch (type) {
			case 'M':
			case 'A':
				fsextra.copy(`${bin_path}/${p}`, `${publish_dir}/${p}`)
					.then(() => {
						console.log(chalk.green(`copy success: ${p}`));
					}).catch(err => {
						console.log(chalk.red(`copy failed: ${p}`));
					}).finally(done);
				break;
			case 'D':
				fsextra.remove(`${publish_dir}/${p}`)
					.then(() => {
						console.log(chalk.green(`remove success: ${p}`));
					}).catch(err => {
						console.log(chalk.red(`remove failed: ${p}`));
					}).finally(done);
				break;
			default:
				done();
				break;
		}
		// }
	}, err=> {
		fs.writeFile(bin_path + '/commint', commit_id, (err)=> {
			if (err) throw err;
			console.log(chalk.green.bold(`\ncommint id: ${commit_id}\n`));
		});
	});

}

function convertAssetList(asset_map) {
	let asset_list = [];
	let altas_temp = [];
	Object.keys(asset_map).forEach(name=> {
		let value = asset_map[name];
		let { atlas } = value;
		let type = 'A';
		if (!atlas) {
			asset_list.push({ type, name, atlas });
		} else if (!altas_temp.includes(name)) {
			let key = asset_map[name].key;
			altas_temp.push(name);
			asset_list.push({ type, name: `${key}.png`, atlas });
			asset_list.push({ type, name: `${key}.${suffix}`, atlas });
		}
	});
	return asset_list;
}

function filterAsset(asset_map, diff_list) {
	let commit_list = [];
	if (!diff_list.length) {
		return convertAssetList(asset_map);
	}
	let altas_temp = [];
	diff_list.forEach(item=> {
		let type = item.charAt(0);
		let name = item.substr(2);
		let atlas = 0;
		if (/^(laya\/assets\/)/.test(name)) {
			name = name.replace(/^(laya\/assets\/)/, '');
			if (!altas_temp.includes(name) && asset_map[name] && asset_map[name].atlas) {
				let key = asset_map[name].key;
				atlas = 1;
				type = 'M';
				altas_temp.push(name);
				commit_list.push({ type, name: `${key}.png`, atlas });
				commit_list.push({ type, name: `${key}.${suffix}`, atlas });
			} else {
				commit_list.push({ type, name, atlas });
			}
		}
	});
	return commit_list;
}

async function getAtlas() {
	return new Promise((relove, reject)=> {
		let rec = fs.readFileSync(rec_path).toString().split('\n');

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
				else e = regR.exec(str);
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
		let git_diff = child_process.spawn('git', ['diff', last_commit_id, '--name-status']); //
		git_diff.stdout.on('data', (data) => {
			diff_list = data.toString().split('\n');
			diff_list = diff_list.map(v=> v.trim());
		});
		git_diff.on('close', ()=> {
			relove(diff_list);
		});
	});
}


async function getLastCommitId() {
	return new Promise((resolve, reject)=> {
		fs.readFile(bin_path + '/commint', (err, data) => {
			if (err) reject(err);
			else resolve(data.toString());
		});
	});
}
