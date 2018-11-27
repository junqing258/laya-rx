const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const chalk = require('chalk');
const eachSeries = require('async/eachSeries');
const fsextra = require('fs-extra');

const root_path = path.resolve(__dirname, '../');
const bin_path = path.resolve(__dirname, '../bin/');
const atlas_dir = '';
const rec_path = bin_path + '/' + atlas_dir + '.rec';
const ui_dir = 'src/ui/layaUI.max.all.js';
const suffix = 'json';

const commit_path = root_path + '/publish/commit.json';

const publish_dir = fs.readFileSync(root_path + '/publish/gamehall').toString();
const publish_app_dir = publish_dir + '/www/files/game/deepseaglory';
const publish_app_index = publish_dir + '/app/template/game/deepseaglory/index.html';

const entry_data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'entry.json')).toString());

let args = process.argv.splice(2);

/* type: pic 0, atlas 1, ui 2, js 3  */

start();

async function start() {
    let commit_id = await getCommitId();
    let commit_data = await getLastCommitData().catch(err=> console.log(err));
	let rec_version = parseInt(fs.statSync(rec_path).ctimeMs);

    let diff_list = [];
    if (commit_data) {
        let { last_commit_id, last_rec_version } = commit_data;
        if (args && args.length) last_commit_id = args[0];
		diff_list = await getDiff(last_commit_id);
        let has_change_ui = diff_list.find(item=> {
			let name = item.substr(2);
			if (/^(laya\/)/.test(name)) {
				let ctimeMs, zname;
				zname = fs.existsSync(name)? name : name.replace(/(.+)\/.*$/, '$1');
				ctimeMs = parseInt(fs.statSync(zname).ctimeMs);
				if (ctimeMs-rec_version>5000) {
					return true;
				}
			}
			return false;
		});
		/* laya/文件夹有变更, 需要laya资源 */
		if (has_change_ui) {
			return console.log(chalk.red('\u8bf7\u5148\u53d1\u5e03\u8d44\u6e90'));
		}
    }

    let asset_map = await getAtlas();
    let version_map = await getVersionMap(asset_map);
    let commit_list = filterAsset(asset_map, diff_list);

    let success_flag = true;

    let script_list = [];

    /* 同步复制到gameHall */
    eachSeries(commit_list, (item, next) => {
        let { act, name, type } = item;
        if (type == 0 || type == 1) { // pic || atlas
            let type_str = type ? `${atlas_dir}` : '';
            let p = `${type_str}${name}`;
            switch (act) {
                case 'M': //增加和修改
                case 'A':
                    fsextra.copy(`${bin_path}/${p}`, `${publish_app_dir}/${p}`)
                        .then(() => {
                            version_map[p] = commit_id;
                            console.log(chalk.green(`${act} success: ${p}`));
                            next();
                        }).catch(err => {
                            success_flag = false;
                            console.log(chalk.red(`${act} failed: ${p}`));
                            next();
                        });
                    break;
                case 'D': //删除
                    fsextra.remove(`${publish_app_dir}/${p}`)
                        .then(() => {
                            delete version_map[p];
                            console.log(chalk.gray(`${act} success: ${p}`));
                            next();
                        }).catch(err => {
                            success_flag = false;
                            console.log(chalk.red(`${act} failed: ${p}`));
                            next();
                        });
                    fsextra.remove(`${bin_path}/${p}`);
                    break;
                default:
                    next();
                    break;
            }
        } else if (type == 2) { // ui
            fsextra.copy(`${root_path}/${ui_dir}`, `${publish_app_dir}/js/layaUI.max.all.js`)
                .then(() => {
                    console.log(chalk.green(`${act} success: ${ui_dir}`));
                    script_list.push('deepseaglory/js/layaUI.max.all.js');
                    next();
                }).catch(err => {
                    success_flag = false;
                    console.log(err);
                    console.log(chalk.red(`${act} failed: ${ui_dir}`));
                    next();
                });
        } else if (type == 3) { // js
            switch (act) {
                case 'M':
                case 'A':
                    let res_name = /^src\//.test(name) ? name.replace(/^src\//, '/js/') : name;
                    let pub_name = path.normalize(res_name.replace(/^bin\//, '')).split(path.sep).join('/');;
                    fsextra.copy(`${root_path}/${name}`, `${publish_app_dir}/${pub_name}`)
                        .then(() => {
                            script_list.push(path.join('deepseaglory', pub_name).split(path.sep).join('/'));
                            console.log(chalk.green(`${act} success: ${name}`));
                            next();
                        }).catch(err => {
                            success_flag = false;
                            console.log(err);
                            console.log(chalk.red(`${act} failed: ${name}`));
                            next();
                        });
                    break;
				default:
					next();
					break;
            }
        }
    }, error => {
        if (success_flag) {
            /* 更新gameHall js 版本号 */
            updateScriptVersion(script_list, commit_id);
            /* 更新 commit.json 和 version.json */
			commit_data.last_commit_id = commit_id;
			commit_data.last_rec_version = rec_version;
            let t = fs.writeFileSync( bin_path+'/version.json', JSON.stringify(version_map) );
            fsextra.copy(bin_path+'/version.json', `${publish_app_dir}/version.json`);
            fs.writeFileSync( commit_path, JSON.stringify(commit_data) );
            
            console.log(chalk.green.bold(`\ncomplete with commit: ${commit_id}`));
        }
    });

}

/* gameHall index.html js 版本号 */
function updateScriptVersion(script_list, commit_id) {
    let htmlcont = fs.readFileSync(publish_app_index).toString();
    let jsreg = /<!--jsfile--startTag-->((?:.|(?:\r?\n))*)<!--jsfile--endTag-->/;
    let oldscript = jsreg.exec(htmlcont);
    if (!oldscript || !oldscript.length>1) return;
    let version_inner = oldscript[1];
    script_list.forEach(jsname=> {
        if (!/\.js?/.test(jsname)) return;
        let reg = new RegExp(`(${jsname}[\?]v=)(.*)\"`);
        version_inner = version_inner.replace(reg, `$1${commit_id}\"`);
    });
    htmlcont = htmlcont.replace(jsreg, `<!--jsfile--startTag-->${version_inner}<!--jsfile--endTag-->`);
    fs.writeFileSync(publish_app_index, htmlcont);
}

/* 读取version.json */
async function getVersionMap(asset_map) {
    return new Promise((reslove, reject)=> {
        let version_path = bin_path+'/version.json';
        let version_map = {};
        if (!fs.existsSync(version_path)) return reject(new Error('no version config'));
        version_map = JSON.parse(fs.readFileSync(version_path).toString());
        reslove(version_map);
    });
}

/* 根据src下的js映射打包后的js */
function getJSChunk(name) {
    if (/^src\/game(teach)?\/.+/.test(name)) {
        return 'bin/js/game.js';
    } else {
        let file_name = Object.keys(entry_data).find(chunk_name => {
            if (chunk_name === 'game') return false;
            return !!entry_data[chunk_name].find(v => v.replace('./', '') == name);
        });
        if (file_name)
            return `bin/js/${file_name}.js`;
    }
    if (/^src\/.+\/.+/.test(name)) return null;
    return name;
}

/**
 * diff_list中小图映射到图集
 */
function filterAsset(asset_map, diff_list) {
    let commit_list = [];
    let asset_temp = [];
    if (!diff_list.length) {
        return console.log('\u6ca1\u6709\u5dee\u5f02');
    }
    diff_list.forEach(item => {
        let args = item.split('\t');
        let act = args[0].charAt(0).toUpperCase(), type = 0, name;
        switch (act) {
            case 'R':
                name = args[2];
                break;
            case 'A':
            case 'M':
            case 'D':
                name = args[1];
                break;
            default:
                console.log(chalk.yellow(item));
                return;
        }
        if (/^(laya\/assets\/)/.test(name)) {
            name = name.replace(/^(laya\/assets\/)/, '');
            if (!asset_temp.includes(name) && asset_map[name] && asset_map[name].type ) {
                let key = asset_map[name].key;
                if (asset_temp.includes(key)) return;
                asset_temp.push(name, key);
                type = 1;
                switch (act) {
                    case 'D':
                    case 'R':
                        let dir = args[1].replace(/(.*)\/.*$/, '$1');
                        if (!fs.existsSync(dir)) {
                            commit_list.push({ act:'D', name: `${dir}.png`, type });
                            commit_list.push({ act:'D', name: `${dir}.${suffix}`, type });
                        }
                        break;
                    default:
                        break;
                }
                commit_list.push({ act:'M', name: `${key}.png`, type });
                commit_list.push({ act:'M', name: `${key}.${suffix}`, type });
            } else if (!asset_temp.includes(name)) {
                asset_temp.push(name);
                commit_list.push({ act, name, type });
            }
        } else if (/^(laya\/pages\/)/.test(name)) {
            name = 'src/ui/layaUI.max.all.js';
            type = 2;
            if (!asset_temp.includes(name)) {
                act = 'M';
                asset_temp.push(name);
                commit_list.push({ act, name, type });
            }
        } else if (/^(src\/)/.test(name)) {
            type = 3;
            name = getJSChunk(name);
            if (name && !asset_temp.includes(name)) {
                asset_temp.push(name);
                commit_list.push({ act, name, type });
                name += '.map';
                if (fs.existsSync(root_path + '/' + name)) {
                    commit_list.push({ act, name, type });
                }
            }
        }
    });
    return commit_list;
}

/**
 * .rec区分图集
 */
async function getAtlas() {
    return new Promise((relove, reject) => {
        let rec = fs.readFileSync(rec_path).toString().split('\n');
        let reg_d = /^D\ (.+)/,
            reg_p = /^P\ (.+)\ (.+\.png)/,
            reg_r = /^[A-Z]\ (.+)\ (.+\.png)/;
        let key, map = {};
        rec.forEach((str, i) => {
            if (reg_d.test(str)) { // 图集
                key = reg_d.exec(str)[1];
            } else if (str) { // 非图集
                let type = 0;
                let result = reg_p.exec(str);
                if (result) 
                    type = 1;
                else 
                    result = reg_r.exec(str);
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

/* 获取最近的commit id */
async function getCommitId() {
    return new Promise((relove, reject) => {
        let commit_id = '';
        let git_rev = child_process.spawn('git', ['rev-parse', '--short', 'HEAD']);
        git_rev.stdout.on('data', (data) => {
            data = String(data);
            commit_id = data.replace(/\n/, '').trim();
        });
        git_rev.stderr.on('data', reject);
        git_rev.on('close', (code) => {
            relove(commit_id);
        });
    });
}

/* git diff 差异 */
async function getDiff(last_commit_id) {
    return new Promise((relove, reject) => {
        let diff_list = [];
        let git_diff = child_process.spawn('git', ['diff', last_commit_id, '--name-status']); //
        git_diff.stdout.on('data', (data) => {
            let list = data.toString().split('\n').map(v => v.trim());
            diff_list = diff_list.concat(list);
        });
        git_diff.on('close', () => {
            relove(diff_list);
        });
    });
}

/* 读取commit.json */
async function getLastCommitData() {
    return new Promise((resolve, reject) => {
        fs.readFile(commit_path, (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data.toString()));
        });
    });
}