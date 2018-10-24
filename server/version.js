const fs = require('fs');
const path = require('path');
const async = require('async');
const child_process = require('child_process');
const chalk  = require('chalk');
const fsextra = require('fs-extra');

const root_path   = path.resolve(__dirname, '../');
const bin_path    = path.resolve(__dirname, '../bin');
const assets_path = path.resolve(__dirname, '../laya/assets');
const publish_dir = fs.readFileSync(root_path+'/publish/gamehall').toString();

start();

async function start() {
	let asset_map = await getAtlas();
	let commit_id = await getCommitId();
	let last_commit_id = fs.readFileSync(bin_path+'/commint').toString();
	let diff_list;
	if (!['', 'null', 'undefined'].includes(last_commit_id)) {
		diff_list = await getDiff(last_commit_id);
	}
	let commit_list = filterAsset(asset_map, diff_list);

	async.eachSeries(commit_list, (file_name, done)=> {
		fsextra.copy(bin_path+'/'+file_name, publish_dir+file_name)
			.then(() => {
				console.log(chalk.green(`copy success: ${file_name}`));
			}).catch(err => {
				console.log(chalk.red(`copy failed: ${file_name}`));
			}).finally(done);
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
