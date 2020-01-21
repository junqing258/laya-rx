module.exports = class UIFile {
	exportCode() {}

	parseVarByObj(obj, arr) {
		if (obj.animations) {
			var i = 0,
				len = 0;
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

	createTSVarByObj(obj, viewMap) {
		var arr = [];
		this.parseVarByObj(obj, arr);
		var str = "";
		for (var i = 0; i < arr.length; i++) {
			var a = arr[i];
			var compType = a[1];
			if (viewMap[compType] == null) {
				str +=
					"		public " +
					a[0] +
					":" +
					CodeManager.getFullClassPath(compType) +
					";\n";
			} else {
				var lib = viewMap[compType];
				if (CodeManager.getRunClass(lib)) {
					lib = CodeManager.getRunClass(lib);
				}
				var libName = lib.substring(lib.lastIndexOf(".") + 1, lib.length);
				str += "		public " + a[0] + ":" + lib + ";\n";
			}
		}
		return str;
	}
};
