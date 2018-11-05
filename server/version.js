const fs = require('fs');
const path = require('path');
const async = require('async');
const child_process = require('child_process');
const chalk = require('chalk');
const fsextra = require('fs-extra');

const root_path = path.resolve(__dirname, '../');
const bin_path = path.resolve(__dirname, '../bin/');
const atlas_dir = '';
const rec_path = bin_path + '/' + atlas_dir + '.rec';
const ui_dir = 'src/ui/layaUI.max.all.js';
const suffix = 'json';

const commit_path = root_path + '/publish/commint';

const publish_dir = fs.readFileSync(root_path + '/publish/gamehall').toString();
const publish_app_dir = publish_dir + '/www/files/game/deepseaglory';

const entry_data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'entry.json')).toString());;
/** type:
 * pic 0, atlas 1, ui 2, js 3 
 */



function getJSChunk(name) {
    if (/^src\/game(teach)?\/.+/.test(name)) {
        return 'bin/js/game.js';
    } else {
        let file_name = Object.keys(entry_data).find(chunk_name => {
            if (chunk_name === 'game') return false;
            let item = entry_data[chunk_name].find(v => v.replace('./', '') == name);
            return !!item;
        });
        if (file_name)
            return `bin/js/${file_name}.js`;
    }
    if (/^src\/.+\/.+/.test(name)) return null;
    return name;
}

start();


async function start() {
    let asset_map = await getAtlas();
    let commit_id = await getCommitId();
    let last_commit_id = await getLastCommitId();

    let diff_list = [];
    if (last_commit_id) {
        diff_list = await getDiff(last_commit_id);
    }
    let commit_list = filterAsset(asset_map, diff_list);

    let success_flag = true;

    async.eachSeries(commit_list, (item, done) => {
        let { act, name, type } = item;
        if (type == 0 || type == 1) {
            let type_str = type ? `${atlas_dir}` : '';
            let p = `${type_str}${name}`;
            switch (act) {
                case 'M':
                case 'A':
                    fsextra.copy(`${bin_path}/${p}`, `${publish_app_dir}/${p}`)
                        .then(() => {
                            console.log(chalk.green(`copy success: ${p}`));
                        }).catch(err => {
                            success_flag = false;
                            console.log(chalk.red(`copy failed: ${p}`));
                        }).finally(done);
                    break;
                case 'D':
                    fsextra.remove(`${publish_app_dir}/${p}`)
                        .then(() => {
                            console.log(chalk.green(`remove success: ${p}`));
                        }).catch(err => {
                            success_flag = false;
                            console.log(chalk.red(`remove failed: ${p}`));
                        }).finally(done);
                    break;
                default:
                    done();
                    break;
            }
        } else if (type == 2) {
            fsextra.copy(`${root_path}/${ui_dir}`, `${publish_app_dir}/js/layaUI.max.all.js`)
                .then(() => {
                    console.log(chalk.green(`copy success: ${ui_dir}`));
                }).catch(err => {
                    success_flag = false;
                    console.log(err);
                    console.log(chalk.red(`copy failed: ${ui_dir}`));
                }).finally(done);
        } else if (type == 3) {
            switch (act) {
                case 'M':
                case 'A':
                    fsextra.copy(`${root_path}/${name}`, `${publish_app_dir}/${name.replace(/^bin\//, '')}`)
                        .then(() => {
                            console.log(chalk.green(`copy success: ${name}`));
                        }).catch(err => {
                            success_flag = false;
                            console.log(err);
                            console.log(chalk.red(`copy failed: ${name}`));
                        }).finally(done);
                    break;
            }
        }
    }, err => {
        if (success_flag) {
            fs.writeFile(commit_path, commit_id, (err) => {
                if (err) throw err;
                console.log(chalk.green.bold(`\ncommint id: ${commit_id}\n`));
            });
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
        if (type!=1) {
            asset_list.push({ act, name, type });
        } else if (!asset_temp.includes(name)) {
            let key = asset_map[name].key;
            asset_temp.push(name);
            asset_list.push({ act, name: `${key}.png`, type }, { act, name: `${key}.${suffix}`, type });
        }
    });
    return asset_list;
}

function filterAsset(asset_map, diff_list) {
    let commit_list = [];
    if (!diff_list.length) {
        return convertAssetList(asset_map);
    }
    let asset_temp = [];
    diff_list.forEach(item => {
        let act = item.charAt(0),
            name = item.substr(2),
            type = 0;
        if (/^(laya\/assets\/)/.test(name)) {
            name = name.replace(/^(laya\/assets\/)/, '');
            if (!asset_temp.includes(name) && asset_map[name] && asset_map[name].type) {
                let key = asset_map[name].key;
                type = 1;
                act = 'M';
                asset_temp.push(name);
                commit_list.push({ act, name: `${key}.png`, type }, { act, name: `${key}.${suffix}`, type });
            } else {
                commit_list.push({ act, name, type });
            }
        } else if (/^(laya\/pages\/)/.test(name)) {
            name = 'src/ui/layaUI.max.all.js';
            act = 'M';
            type = 2;
            if (!asset_temp.includes(name)) {
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

async function getAtlas() {
    return new Promise((relove, reject) => {
        const rec = fs.readFileSync(rec_path).toString().split('\n');

        let reg_d = /^D\ (.+)/,
            reg_p = /^P\ (.+)\ (.+\.png)/,
            reg_r = /^[A-Z]\ (.+)\ (.+\.png)/;

        let key, map = {};
        rec.forEach((str, i) => {
            if (reg_d.test(str)) {
                key = reg_d.exec(str)[1];
            } else {
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

async function getCommitId() {
    return new Promise((relove, reject) => {
        let commint_id = '';
        let git_rev = child_process.spawn('git', ['rev-parse', '--short', 'HEAD']);
        git_rev.stdout.on('data', (data) => {
            commint_id = data.toString().replace(/\n/, '').trim();
        });
        git_rev.stderr.on('data', reject);
        git_rev.on('close', (code) => {
            relove(commint_id);
        });
    });
}

async function getDiff(last_commit_id) {
    return new Promise((relove, reject) => {
        let diff_list = [];
        let git_diff = child_process.spawn('git', ['diff', last_commit_id, '--name-status']);
        git_diff.stdout.on('data', (data) => {
            diff_list = data.toString().split('\n').map(v => v.trim());
        });
        git_diff.on('close', () => {
            relove(diff_list);
        });
    });
}


async function getLastCommitId() {
    return new Promise((resolve, reject) => {
        fs.readFile(commit_path, (err, data) => {
            if (err) resolve('');
            else resolve(data.toString());
        });
    });
}