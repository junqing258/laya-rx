#!/usr/bin/env node
const path = require("path");
const program = require("commander");
const glob = require("glob");
const fs = require("fs");
const spawn = require("child_process").spawn;
const os = require("os");
const template = require("art-template");

const UIParser = require("./gen/UIParser");

const pagePath = path.resolve(__dirname, "../laya/pages/");

(() => {
	const uiFiles = glob.sync('**/*.ui', {cwd: pagePath });
	let uiTpls = [], viewRegs = [];
	uiFiles.forEach(uiFile => {
		const parser = new UIParser({ pagePath });
		const data = parser.parse(uiFile);
		const vreg = data.viewClassMaps.filter(f => !viewRegs.find(v => v[0] === f[0]));
		viewRegs.push(...vreg);
		const uiTpl = template(__dirname + "/tpl/ui.art", data);
		uiTpls.push(uiTpl);
	});
	viewRegs = Array.from(new Set(viewRegs));
	const uiMaxTpl = template(__dirname + "/tpl/ui-max.art", { tpls: uiTpls, viewRegs });
	fs.writeFileSync(path.resolve(__dirname, "../src/ui/layaUI.max.all.ts"), uiMaxTpl);
})();