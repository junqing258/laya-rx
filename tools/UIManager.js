#!/usr/bin/env node
const path = require("path");
const program = require("commander");
var glob = require("glob");
const fs = require("fs");
const spawn = require("child_process").spawn;
const os = require("os");
const template = require("art-template");

// const argv = require('yargs').argv;

const UIParser = require("./UIParser");
const parser = new UIParser();

const data = parser.parse("senses/Loadding.ui");
const uiStr = template(__dirname + "/tpl/ui.art", data);

const files = [uiStr];
const uiMax = template(__dirname + "/tpl/ui-max.art", { files });

fs.writeFileSync(path.resolve(__dirname, "../src/ui/layaUI.max.all.ts"), uiMax);
