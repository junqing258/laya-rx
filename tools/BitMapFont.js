#!/usr/bin/env node
const path = require("path");
const program = require("commander");
const fs = require("fs");
const { spawn, exec } = require("child_process");
const os = require("os");
const template = require("art-template");

const fnt = template(__dirname + "/tpl/tpl-fnt.art", {
	files: [1, 2, 3, 4]
});

// https://www.cnblogs.com/sandal1980/articles/3904623.html
(() => {
	const args = [];
	args.push("--sheet out.png");
	args.push("--data out.plist");
	args.push("--texturepath laya/fonts/font_white26");

	exec("TexturePacker " + args.join(" "));
	// fs.writeFileSync(__dirname + "/a.fnt", fnt);
})();

