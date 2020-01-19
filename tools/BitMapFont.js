const path    = require("path");
const program = require("commander");
const fs      = require("fs");
const spawn   = require("child_process").spawn;
const os      = require("os");
const template = require('art-template');

const fnt = template(__dirname + '/tpl/tpl-fnt.art', {
	files: [1,2,3,4]
});

fs.writeFileSync(__dirname+'/a.fnt', fnt);