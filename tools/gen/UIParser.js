
const fs = require("fs");
const path = require("path");
const config = require("./config");


module.exports = class UIParser {
	
	constructor(props) {
		this.uiObj = {};
		this.parseData = {
			vars: [],
			imports: [],
			uiObj: {},
			viewClassMaps: []
		};
		this.pagePath = props.pagePath;
	}

	parse(filename) {
		const filepath = path.join(this.pagePath, filename);
		const packArr = path.dirname(filename).split('/').filter(v => v);
		const className = path.basename(filename).split(".")[0] + "UI";

		const pack = packArr.join(".");
		const content = fs.readFileSync(filepath);
		const obj = this.uiObj = JSON.parse(content);
		const classType = obj.type;

		Object.assign(this.parseData, { pack, className, classType });

		const { parseData } = this;
		this.parseObj(this.uiObj, parseData.uiObj, (obj, newObj) => {
			this.collectUIObj(obj, newObj);
			this.collectVars(obj, parseData.vars);
			this.collectImports(obj, parseData.imports);
			this.collectRegView(obj, parseData.viewClassMaps);
		});
		
		this.parseData.uiObj = JSON.stringify(this.parseData.uiObj);

		return this.parseData;
	}

	collectVars(obj, arr) {
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
	}

	collectImports(obj, arr) {
		const { type } = obj;
		if (obj.animations) {
			if (!arr.find(v => v[0]==="FrameAnimation")) {
				arr.push(["FrameAnimation", "Laya.FrameAnimation"]);
			}
		}
		if (!arr.find(v => v[0]===type)) {
			arr.push([type, "Laya."+type]);
		}
	}

	collectRegView(obj, arr) {
		const { type } = obj;
		if (config.viewMap[type]) {
			if (!arr.find(v => v[0]===type)) {
				arr.push([type, config.viewMap[type]]);
			}
		}
	}
	// UIView runtime Script
	
	collectUIObj(obj, newObj) {
		const keysNeeded = ["type", "props", /*"child", "compId", "animations"*/];
		Object.keys(obj).forEach(key => {
			var value = obj[key];
			if (!keysNeeded.includes(key)) return;
			if (key === "props") {
				delete obj.props.layers;
				delete obj.props.layer;
				delete obj.props.sceneWidth;
				delete obj.props.sceneHeight;
				delete obj.props.sceneColor;
				delete obj.props.sceneBg;
				delete obj.props.styleSkin;
				['skin', 'text'].forEach(type => {
					if (obj.props[type] && String(obj.props[type]).indexOf("~") >= 0) {
						delete node.props[type];
					}
				});
				['vScrollBarSkin', 'vScrollBarSkin'].forEach(type => {
					if (obj.props[type] && String(obj.props[type]).indexOf("~") >= 0) {
						node.props[type] = "";
					}
				});
			}
			newObj[key] = value;
		});
	}

	parseObj(obj, uiObj, regCb) {
		regCb(obj, uiObj);

		var list = obj.child;
		if (list && list.length) {
			uiObj.child = [];
			for (var j = 0, n = list.length; j < n; j++) {
				uiObj.child[j] = {};
				this.parseObj(list[j], uiObj.child[j], regCb);
			}
		}
	}
};

