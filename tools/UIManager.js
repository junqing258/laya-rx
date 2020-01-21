#!/usr/bin/env node
const path = require("path");
const program = require("commander");
var glob = require("glob");
const fs = require("fs");
const spawn = require("child_process").spawn;
const os = require("os");
const template = require("art-template");

require("./ProjectExportTools/LayaAirCmdTool.max.js");

// const argv = require('yargs').argv;

const CodeManager = laya.editor.manager.CodeManager;

const uiStr = template(__dirname + "/tpl/ui.art", {
	className: "AABB",
	vars: []
});

fs.writeFileSync(__dirname + "/A.ts", uiStr);
