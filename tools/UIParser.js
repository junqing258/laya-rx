
const fs = require("fs");

module.exports = class UIParser {
	
	constructor() {
		this.vars = [];
		this.uiObj = {};
		this.parseData = {};
	}

	parse(filepath) {
		const content = fs.readFileSync(filepath);
		this.uiObj = JSON.parse(content);
		this.collectVars();
		return this.parseData;
	}

	collectVars() {
		let arr = [];
		this.parseVarByObj(this.uiObj, arr);
		console.log(JSON.stringify(arr));
		this.parseData.vars = arr;
	}

	objToUI() {
		
	}

	parseVarByObj(obj, arr) {
		if (obj.animations) {
			var i = 0, len = 0;
			var animations;
			animations = obj.animations;
			len = animations.length;
			for (i = 0; i < len; i++) {
				if (animations[i].nodes && animations[i].nodes.length > 0)
					arr.push([String(animations[i].name), "FrameAnimation"]);
			}
		}
		if (obj.props["var"]) {
			arr.push([
				String(obj.props["var"]),
				obj.props.runtime ? String(obj.props.runtime) : obj.type
			]);
		}
		var list = obj.child;
		if (list)
			for (var j = 0, n = list.length; j < n; j++) {
				this.parseVarByObj(list[j], arr);
			}
	}
};

