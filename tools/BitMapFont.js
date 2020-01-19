
const template = require('art-template');
const fs = require("fs");

const fnt = template(__dirname + '/tpl/tpl-fnt.art', {
	files: [1,2,3,4]
});

fs.writeFileSync(__dirname+'/a.fnt', fnt);