require("./laya");

// PageStyleManager
// 
module.exports = function CodeManager() {}

__class(CodeManager, "laya.editor.manager.CodeManager");
CodeManager.exportCode = function() {
	console.log("ExportCode");
	CodeManager.uiObjMap = {};
	CodeManager.projectExportType = PageStyleManager.getProjectExportType();
	CodeManager.isLoadMode = PageExportType.isLoadType(
		CodeManager.projectExportType
	);
	CodeManager.isUIPackMode = CodeManager.projectExportType == PageExportType.LOAD_PACK;
	CodeManager.isAs = Math.ceil(ProjectSetting.codeType) == 0;
	CodeManager.initPreExportInfo();
	CodeTplManager.initCodeTpls();
	CodeManager.tPageFileInfos = {};
	CodeManager.uiDataExportFolder = FileTools.getFolder(
		FileManager.getWorkPath(ProjectSetting.uiExportPath)
	);
	CodeManager.createByDir(SystemSetting.pagesPath);
	if (CodeManager.isUIPackMode) {
		FileManager.createJSONFile(
			FileManager.getWorkPath(ProjectSetting.uiExportPath),
			CodeManager.uiObjMap
		);
		CodeManager.uiObjMap = {};
	}
	CodeManager.saveExportInfo();
	console.log("Export code complete");
};

CodeManager.initPreExportInfo = function() {
	var filePath;
	filePath = CodeManager.getPreExportFilePath();
	CodeManager.preExportInfo = null;
	CodeManager.prePageFileInfos = null;
	CodeManager.hasPreExportInfo = false;
	CodeManager.isConfigsChanged = true;
	if (!FileTools.exist(filePath)) return;
	try {
		CodeManager.preExportInfo = FileManager.readJSONFile(filePath);
		CodeManager.prePageFileInfos = CodeManager.preExportInfo["files"];
		CodeManager.hasPreExportInfo = true;
		if (
			CodeManager.getConfigsStatuStr() ==
			CodeManager.preExportInfo["configStr"]
		) {
			CodeManager.isConfigsChanged = false;
		}
	} catch (e) {}
};

CodeManager.getConfigsStatuStr = function() {
	var ctimes;
	ctimes = [];
	var i = 0,
		len = 0;
	len = CodeManager.configFiles.length;
	for (i = 0; i < len; i++) {
		var tFile;
		tFile = FileManager.getWorkPath("laya/" + CodeManager.configFiles[i]);
		if (FileTools.exist(tFile)) {
			ctimes.push(FileTools.getMTime(tFile));
		}
	}
	return ctimes.join("_");
};

CodeManager.saveExportInfo = function() {
	var saveO;
	saveO = {};
	saveO["configStr"] = CodeManager.getConfigsStatuStr();
	saveO["files"] = CodeManager.tPageFileInfos;
	FileManager.createJSONFile(CodeManager.getPreExportFilePath(), saveO);
	CodeManager.tPageFileInfos = {};
};

CodeManager.getPrePageInfoO = function(pagePath) {
	if (
		CodeManager.prePageFileInfos &&
		CodeManager.prePageFileInfos[pagePath]
	) {
		return CodeManager.prePageFileInfos[pagePath];
	} else {
		return null;
	}
};

CodeManager.isCacheCodeOK = function(pagePath, mTime) {
	if (CodeManager.isUIPackMode) return false;
	if (!CodeManager.hasPreExportInfo) return false;
	if (CodeManager.isConfigsChanged) return false;
	var pageInfo;
	pageInfo = CodeManager.getPrePageInfoO(pagePath);
	if (pageInfo) {
		if (
			mTime == pageInfo["mTime"] &&
			!pageInfo["hasSpecial"] &&
			pageInfo["code"]
		) {
			return true;
		}
	}
	return false;
};

CodeManager.getCacheCode = function(pagePath, mTime) {
	if (!CodeManager.isCacheCodeOK(pagePath, mTime)) return null;
	return CodeManager.getPrePageInfoO(pagePath)["code"];
};

CodeManager.isSpecialPageFile = function(pageTxt) {
	var i = 0,
		len = 0;
	len = CodeManager.SpecialPageKeyWords.length;
	for (i = 0; i < len; i++) {
		if (pageTxt.indexOf(CodeManager.SpecialPageKeyWords[i]) >= 0) {
			return true;
		}
	}
	return false;
};

CodeManager.getPreExportFilePath = function() {
	return FileManager.getDataPath(
		"codeCache/" + CodeManager.getProjectSign() + "code.cache"
	);
	return FileManager.getWorkPath("laya/code.cache");
};

CodeManager.getProjectSign = function() {
	var sign;
	sign = FileManager.adptToCommonUrl(SystemSetting.workPath);
	sign = SMD5.md5(sign, null, null);
	return sign;
};

CodeManager.getCodePath = function(pagePath) {
	var page1 = FileManager.getRelativePath(SystemSetting.pagesPath, pagePath);
	var page2 = FileManager.getWorkPath(
		ProjectSetting.codeExportPath + "/" + page1
	);
	var newNameSign;
	switch (Math.ceil(ProjectSetting.codeType)) {
		case 0:
			newNameSign = "UI.as";
			break;
		case 2:
		case 2:
			newNameSign = "UI.js";
			break;
		case 1:
			newNameSign = "UI.ts";
			break;
	}
	var i = 0,
		len = 0;
	len = CodeManager.pageFileSigns.length;
	for (i = 0; i < len; i++) {
		if (page2.indexOf(CodeManager.pageFileSigns[i]) >= 0) {
			return page2.replace(CodeManager.pageFileSigns[i], newNameSign);
		}
	}
	return page2.replace(".ui", newNameSign);
};

CodeManager.initTsCodePre = function() {
	ObjectTools.clearObj(CodeManager.importDic);
	var arr;
	arr = ProjectSetting.codeImportsTS.split("\n");
	var preImports;
	var preCodes;
	preImports = [];
	preCodes = [];
	var i = 0,
		len = 0;
	len = arr.length;
	var tStr;
	for (i = 0; i < len; i++) {
		tStr = arr[i];
		if (tStr.indexOf("import") >= 0) {
			preImports.push(tStr);
			CodeManager.parseTsImport(tStr);
		} else {
			preCodes.push(tStr);
		}
	}
	CodeManager.tsCodePreImport = preImports.join("\n");
	CodeManager.tsCodePreFromImport = preCodes.join("\n");
};

CodeManager.parseTsImport = function(str) {
	var tStr;
	tStr = str.replace("import", "");
	var arr;
	arr = tStr.split("=");
	tStr = StringTool.trimSide(arr[0]);
	CodeManager.importDic[tStr] = true;
};

CodeManager.createByDir = function(file) {
	var fileList;
	fileList = FileTools.getFileList(file);
	var i = 0,
		len = 0;
	len = fileList.length;
	var tFile;
	var code;
	var obj;
	var codePath;
	var resUsed;
	resUsed = [];
	var allInOneFile;
	CodeManager.initTsCodePre();
	switch (Math.ceil(ProjectSetting.codeType)) {
		case 0:
			break;
		case 2:
			CodeManager.allInOnePre = CodeTplManager.jsCodePre;
			allInOneFile =
				CodeManager.allInOnePre + "\n" + ProjectSetting.codeImportsJS;
			break;
		case 1:
			CodeManager.allInOnePre = CodeTplManager.tsCodePre;
			allInOneFile =
				CodeManager.allInOnePre + "\n" + ProjectSetting.codeImportsTS;
			break;
	}
	var hasCodeFile = false;
	hasCodeFile = false;
	var changeTime;
	var rPath;
	var tPageInfo;
	var isCacheOK = false;
	for (i = 0; i < len; i++) {
		tFile = fileList[i];
		if (FileTools.isDirectory(tFile)) {
		} else {
			rPath = FileManager.getRelativePath(SystemSetting.pagesPath, tFile);
			changeTime = FileTools.getMTime(tFile).toString();
			isCacheOK = CodeManager.isCacheCodeOK(rPath, changeTime);
			if (isCacheOK && CodeManager.isAs) {
				continue;
			}
			tPageInfo = CodeManager.getPrePageInfoO(rPath);
			if (!tPageInfo) {
				tPageInfo = {};
			}
			tPageInfo["mTime"] = changeTime;
			CodeManager.tPageFileInfos[rPath] = tPageInfo;
			if (TypeManager.getFileType(tFile) == "graphic_animation") {
				var tarPath;
				tarPath = FileManager.getPath(
					FileManager.getWorkPath(ProjectSetting.asynResExportPath),
					rPath
				);
				var tDataConfig;
				tDataConfig = FileManager.readJSONFile(tFile);
				CodeManager.cleanUIObj(tDataConfig, null);
				FileManager.createJSONFile(tarPath, tDataConfig);
			} else if (TypeManager.isCodeViewFile(tFile)) {
				if (TypeManager.getFileType(tFile) == "Prefab") {
					if (
						!PageStyleManager.getIfPageExport(
							FileManager.getRelativePath(
								SystemSetting.pagesPath,
								tFile
							)
						)
					) {
						continue;
					}
				}
				hasCodeFile = true;
				try {
					if (isCacheOK) {
						code = CodeManager.getCacheCode(rPath, changeTime);
					} else {
						console.log("Export:", rPath);
						code = FileManager.readTxtFile(tFile);
						tPageInfo["hasSpecial"] = CodeManager.isSpecialPageFile(
							code
						);
						obj = ObjectTools.getObj(code);
						if (obj.props) {
							delete obj.props["var"];
						}
						if (obj.props && obj.props["base64pic"] == true) {
							CodeManager.collectSkins(obj, resUsed);
						}
						code = CodeManager.objToUI(obj, tFile);
					}
					tPageInfo["code"] = code;
					codePath = CodeManager.getCodePath(tFile);
					if (
						ProjectSetting.codeType == 2 ||
						ProjectSetting.codeType == 1
					) {
						allInOneFile += "\n" + code;
					} else {
						if (ProjectSetting.codeType == 1) {
							code = CodeTplManager.tsCodePre + "\n" + code;
						}
						FileManager.createTxtFile(codePath, code);
					}
				} catch (e) {
					Alert.show(
						Sys.lang(
							"读取页面({0})出错\n{1}读取页面出错",
							tFile,
							e.toString()
						)
					);
				}
			} else if (
				TypeManager.getFileType(tFile) == "particle" ||
				TypeManager.getFileType(tFile) == "particle3D" ||
				TypeManager.getFileType(tFile) == "particlepoly"
			) {
				rPath = FileManager.getRelativePath(
					SystemSetting.pagesPath,
					tFile
				);
				tarPath = FileManager.getPath(
					FileManager.getWorkPath(ProjectSetting.asynResExportPath),
					rPath
				);
				FileTools.copyFile(tFile, tarPath);
				var tParticleConfig;
				tParticleConfig = FileManager.readJSONFile(tFile);
				var textureFile;
				if (!tParticleConfig) {
					Alert.show(Sys.lang("文件已损坏！：{0}", tFile));
					continue;
				}
				textureFile = tParticleConfig.textureName;
				var texturePath;
				if (textureFile) {
					texturePath = FileManager.getResPath(textureFile);
					var tarTexturePath;
					tarTexturePath = FileManager.getPath(
						FileManager.getWorkPath(
							ProjectSetting.asynResExportPath
						),
						textureFile
					);
					FileTools.copyFile(texturePath, tarTexturePath);
				}
			}
		}
	}
	if (!hasCodeFile) return;
	CodeManager.saveBase64Pics(resUsed);
	if (ProjectSetting.codeType == 2 || ProjectSetting.codeType == 1) {
		var fileType;
		fileType = ProjectSetting.codeType == 2 ? "js" : "ts";
		codePath = CodeManager.getCodePath(
			FileManager.getPath(file, "layaUI.max.all." + fileType)
		);
		FileManager.createTxtFile(codePath, allInOneFile);
		var tarFolder;
		tarFolder = codePath.replace(".ts", ".js");
		if (ProjectSetting.codeType == 1) {
			var cmdTSC;
			cmdTSC = 'tsc --out "' + tarFolder + '" "' + codePath + '"';
		}
	}
};

CodeManager.collectSkins = function(uiO, resUsed) {
	resUsed = TemplateManager.findAllResUsed(uiO, resUsed);
};

CodeManager.saveBase64Pics = function(resUsed) {
	if (!resUsed || resUsed.length < 1) return;
	var i = 0,
		len = 0;
	len = resUsed.length;
	var data;
	data = {};
	for (i = 0; i < len; i++) {
		CodeManager.convertSkinRes(resUsed[i], data);
	}
	var codePath;
	codePath = FileManager.getPath(
		FileManager.getWorkPath(ProjectSetting.resExportPath),
		"base64pic.json"
	);
	FileManager.createTxtFile(codePath, JSON.stringify(data));
	if (ProjectSetting.codeType == 0) {
		CodeManager.saveAsBase64Class(data);
	}
};

CodeManager.saveAsBase64Class = function(data) {
	var tpl;
	tpl = FileManager.readTxtFile(
		FileManager.getAppPath(Paths.ASBase64Template)
	);
	var codePath;
	codePath = FileManager.getWorkPath(CodeTplManager.base64path);
	var dataO;
	dataO = {};
	dataO["pack"] = CodeTplManager.base64pack;
	dataO["base64data"] = JSON.stringify(data);
	var code;
	code = CodeManager.createExportCode(tpl, dataO);
	FileManager.createTxtFile(codePath, code);
};

CodeManager.convertSkinRes = function(skinPath, data) {
	var tex;
	var tPath;
	var i = 0,
		len = 0;
	len = CodeManager.specialFiles.length;
	for (i = 0; i < len; i++) {
		tPath = StringTool.getReplace(
			skinPath,
			".png",
			CodeManager.specialFiles[i]
		);
		if (!data[tPath] && ResFileManager.hasRes(tPath)) {
			tex = ResFileManager.getRes(tPath);
			if (tex) {
				data[tPath] = Base64ImageTool.getBase64Pic(tex);
			}
		}
	}
};

CodeManager.getSkinSpecialRes = function(skinPath, arr) {
	var tex;
	var tPath;
	var i = 0,
		len = 0;
	len = CodeManager.specialFiles.length;
	for (i = 0; i < len; i++) {
		tPath = StringTool.getReplace(
			skinPath,
			".png",
			CodeManager.specialFiles[i]
		);
		if (tPath == skinPath) continue;
		if (ResFileManager.hasRes(tPath)) {
			arr.push(tPath);
		}
	}
};

CodeManager.getReferStr = function(myPack, tarClass) {
	var rst;
	var myArr;
	var tarArr;
	myArr = myPack.split(".");
	tarArr = tarClass.split(".");
	while (myArr.length && tarArr.length && myArr[0] == tarArr[0]) {
		myArr.shift();
		tarArr.shift();
	}
	var i = 0,
		len = 0;
	len = myArr.length;
	for (i = 0; i < len; i++) {
		myArr[i] = "../";
	}
	if (myArr.length > 0) {
		rst = myArr.join("") + tarArr.join("/");
	} else {
		rst = tarArr.join("/");
	}
	rst = rst + ".ts";
	rst = '///<reference path="' + rst + '" />';
	return rst;
};

CodeManager.objToUI = function(obj, pagePath) {
	var pageType;
	pageType = TypeManager.getFileType(pagePath);
	var isEfc = false;
	isEfc = pageType == "MoveEffect";
	var isPreset = false;
	var className = FileManager.getFileName(pagePath) + "UI";
	var pack = CodeManager.getPackage(pagePath);
	var uiXml = ObjectTools.copyObjFast(obj);
	var viewMap = {};
	isPreset = TypeManager.isPreFabNodeType(obj.type);
	CodeManager.parseUIobj(uiXml, viewMap);
	var imports = "";
	var temp = [];
	for (var key in viewMap) {
		temp.push({ name: key, lib: viewMap[key] });
	}
	temp.sort(MathUtil.sortByKey("name"));
	var viewClassMap = "";
	var preRefers = "";
	var obj1;
	for (var $each_obj1 in temp) {
		obj1 = temp[$each_obj1];
		var lib = obj1.lib;
		var libName = lib.substring(lib.lastIndexOf(".") + 1, lib.length);
		var regName;
		if (obj1.lib == obj1.name && CodeManager.getRunClass(obj1.name)) {
			lib = CodeManager.getRunClass(obj1.name);
			libName = lib.substring(lib.lastIndexOf(".") + 1, lib.length);
			regName = obj1.name;
		} else {
			regName = lib;
		}
		if (ProjectSetting.codeType == 0) {
			imports += "	import " + lib + ";\n";
			viewClassMap +=
				'			View.regComponent("' + regName + '",' + libName + ");\n";
		} else {
			imports += "	import " + libName + " = " + lib + ";\n";
			viewClassMap +=
				'			View.regComponent("' + regName + '",' + lib + ");\n";
			preRefers += "\n" + CodeManager.getReferStr(pack, lib);
		}
	}
	var str = "";
	if (isEfc) {
		obj.type = "EffectAnimation";
	}
	var baseName = obj.type;
	var uiObj;
	uiObj = ObjectTools.copyObjFast(uiXml);
	var needCompIdNode;
	needCompIdNode = AnimationDataWorker.getAnimationedNode(uiObj);
	CodeManager.cleanUIObj(uiObj, needCompIdNode);
	if (!CodeManager.isViewHasAnimation(uiObj)) {
		delete uiObj.animations;
	}
	var uiPath;
	var pageLink;
	uiPath = pack + "." + className;
	uiPath = FileManager.getRelativePath(SystemSetting.pagesPath, pagePath);
	pageLink = uiPath = FileManager.adptToCommonUrl(uiPath);
	uiPath = uiPath.split(".")[0];
	var classObj;
	classObj = {};
	classObj["className"] = className;
	classObj["classType"] = baseName;
	if (ProjectSetting.codeType == 1) {
		classObj["classType"] = CodeManager.getFullClassPath(baseName);
	}
	classObj["pack"] = pack;
	classObj["viewClassMap"] = viewClassMap;
	classObj["uiObj"] = JSON.stringify(uiObj);
	classObj["uiPath"] = uiPath;
	var fullClassname;
	if (!pack) {
		fullClassname = className;
	} else {
		fullClassname = pack + "." + className;
	}
	classObj["fullClassname"] = fullClassname;
	var pageExportType;
	pageExportType = PageStyleManager.getPageFinalExportType(pageLink);
	switch (pageExportType) {
		case PageExportType.INCODE:
			break;
		case PageExportType.LOAD_ONE:
			FileManager.createJSONFile(
				FileManager.getPath(
					CodeManager.uiDataExportFolder,
					uiPath + ".json"
				),
				uiObj
			);
			break;
		case PageExportType.LOAD_PACK:
			CodeManager.uiObjMap[uiPath] = ObjectTools.copyObjFast(uiObj);
			break;
	}
	switch (Math.ceil(ProjectSetting.codeType)) {
		case 0:
			classObj["vars"] = CodeManager.createVarByObj(uiXml, viewMap);
			break;
		case 2:
		case 2:
			classObj["vars"] = CodeManager.createJSVarByObj(uiXml, viewMap);
			break;
		case 1:
			classObj["vars"] = CodeManager.createTSVarByObj(uiXml, viewMap);
			break;
	}
	if (ProjectSetting.codeType == 0) {
		classObj["imports"] =
			CodeManager.prefixStr(ProjectSetting.codeImports, "	") +
			"\n" +
			imports;
	} else {
		classObj["imports"] =
			CodeManager.prefixStr(CodeManager.tsCodePreImport, "	") +
			"\n" +
			imports;
		classObj["importsPre"] =
			CodeManager.tsCodePreFromImport + "\n" + preRefers;
		classObj["imports"] = CodeManager.prefixStr("", "	") + imports;
		classObj["importsPre"] = "";
	}
	var tplStr;
	tplStr = CodeTplManager.getCodeTpl(
		ProjectSetting.codeType,
		isPreset,
		PageExportType.isLoadType(pageExportType),
		isEfc
	);
	str = CodeManager.createExportCode(tplStr, classObj);
	return str;
};

CodeManager.createExportCode = function(tplStr, data) {
	var rst;
	var key;
	rst = tplStr;
	for (key in data) {
		rst = StringTool.getReplace(rst, "{!" + key + "!}", data[key]);
	}
	return rst;
};

CodeManager.cleanUIObj = function(node, compIdNeedDic) {
	var tkey;
	var childs;
	var i = 0,
		len = 0;
	if (!node.child) node.child = [];
	childs = node.child;
	len = childs.length;
	var type;
	type = node.type;
	var skinLabel;
	skinLabel = UIConfigManager.getCompSkinLabel(type);
	if (node.props && node.props[skinLabel]) {
		var skinStr;
		skinStr = node.props[skinLabel];
		if (skinStr.indexOf("~") >= 0) {
			delete node.props[skinLabel];
		}
	}
	for (i = 0; i < len; i++) {
		CodeManager.cleanUIObj(childs[i], compIdNeedDic);
	}
	for (tkey in node) {
		if (!CodeManager.keysNeeded.hasOwnProperty(tkey)) {
			delete node[tkey];
		}
	}
	var props;
	props = node.props;
	if (props) {
		for (tkey in CodeManager.propkeysRemove) {
			delete props[tkey];
		}
		for (tkey in CodeManager.NumKeys) {
			if (tkey in props) {
				props[tkey] = parseFloat(props[tkey]);
			}
		}
	}
	if (node.compId && compIdNeedDic && !compIdNeedDic[node.compId]) {
		delete node.compId;
	}
	if (childs.length < 1) {
		delete node.child;
	}
	if (!CodeManager.isViewHasAnimation(node)) {
		delete node.animations;
	}
};

CodeManager.createJSVarByObj = function(obj, viewMap) {
	var arr = [];
	CodeManager.parseVarByObj(obj, arr);
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		var a = arr[i];
		var compType = a[1];
		if (viewMap[compType] == null) {
			str += "		    this." + a[0] + "=null;\n";
		} else {
			var lib = viewMap[compType];
			var libName = lib.substring(lib.lastIndexOf(".") + 1, lib.length);
			str += "		    this." + a[0] + "=null;\n";
		}
	}
	return str;
};

CodeManager.createVarByObj = function(obj, viewMap) {
	var arr = [];
	CodeManager.parseVarByObj(obj, arr);
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		var a = arr[i];
		var compType = a[1];
		if (viewMap[compType] == null) {
			str += "		public var " + a[0] + ":" + compType + ";\n";
		} else {
			var lib = viewMap[compType];
			if (CodeManager.getRunClass(lib)) {
				lib = CodeManager.getRunClass(lib);
			}
			var libName = lib.substring(lib.lastIndexOf(".") + 1, lib.length);
			str += "		public var " + a[0] + ":" + libName + ";\n";
		}
	}
	return str;
};

CodeManager.createTSVarByObj = function(obj, viewMap) {
	var arr = [];
	CodeManager.parseVarByObj(obj, arr);
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
};

CodeManager.getFullClassPath = function(className) {
	var runClass;
	runClass = UIConfigManager.getCompProp(className, "runClass");
	if (CodeManager.importDic[className]) {
		return className;
	}
	if (!runClass) runClass = "Laya." + className;
	return runClass;
};

CodeManager.getRunClass = function(className) {
	if (CodeManager.importDic[className]) {
		return null;
	}
	var runClass;
	runClass = UIConfigManager.getCompProp(className, "runClass");
	return runClass;
};

CodeManager.cleanNodeAnimations = function(node) {
	if (!CodeManager.isViewHasAnimation(node)) {
		delete node.animations;
	}
};

CodeManager.isViewHasAnimation = function(obj) {
	if (obj.animations) {
		var i = 0,
			len = 0;
		var animations;
		animations = obj.animations;
		len = animations.length;
		for (i = 0; i < len; i++) {
			if (animations[i].nodes && animations[i].nodes.length > 0)
				return true;
		}
	}
	return false;
};

CodeManager.parseVarByObj = function(obj, arr) {
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
			CodeManager.parseVarByObj(list[j], arr);
		}
};

CodeManager.prefixStr = function(str, prefix) {
	var arr = str.split("\n");
	for (var i = 0, n = arr.length; i < n; i++) {
		arr[i] = prefix + arr[i];
	}
	return arr.join("\n");
};

CodeManager.getPackage = function(path) {
	if (path == null) return null;
	path = FileManager.getRelativePath(SystemSetting.pagesPath, path);
	path = FileManager.adptToCommonUrl(path);
	path = path.substring(0, path.lastIndexOf("/")).replace(/\//g, ".");
	var uiPath = ProjectSetting.codeExportPath;
	uiPath = FileManager.adptToCommonUrl(uiPath);
	if (uiPath.charAt(uiPath.length - 1) != "/") {
		uiPath = uiPath + "/";
	}
	var startIndex =
		uiPath.indexOf("src/") > -1
			? uiPath.indexOf("src/") + 4
			: uiPath.indexOf("/") + 1;
	uiPath = uiPath
		.substring(startIndex, uiPath.length - 1)
		.replace(/\//g, ".");
	var pack = uiPath + (path != "" ? "." + path : "");
	return pack;
};

CodeManager.parseUIobj = function(obj, viewMap) {
	var compType = obj.type;
	compType = StringTool.trimSide(compType);
	obj.type = compType;
	var runtime;
	var prefabO;
	prefabO = PreFabManager.I.getPreFabByNode(obj);
	if (compType != "View" && compType != "Dialog") {
		if (compType != "UIView") {
			var skinLabel = "";
			skinLabel = UIConfigManager.getCompProp(compType, "skinLabel");
			skinLabel = skinLabel || "styleSkin";
			var skin = obj.props[skinLabel] || obj.props["skin"];
			if (prefabO && prefabO.props && prefabO.props[skinLabel]) {
				skin = prefabO.props[skinLabel];
			}
			if (Boolean(skin)) {
				var defaultProps = ResStyleManager.getPropArr(skin);
				CodeManager.setObjDefaultValue(obj, defaultProps);
			}
		} else {
			var sourcePath = obj.source;
			if (Boolean(sourcePath)) {
				defaultProps = ResStyleManager.getPropArrByPropStr(
					PageStyleManager.getPageProps(sourcePath)
				);
				CodeManager.setObjDefaultValue(obj, defaultProps);
			}
		}
	}
	if (prefabO && obj.props && prefabO.props) {
		PreFabManager.insertValues(obj.props, prefabO.props, obj.props);
	}
	AppendPropGroupTool.insertAppendProps(obj);
	AppendPropGroupTool.adptScriptNode(obj);
	PreFabManager.I.clearPreFabProps(obj);
	if (compType == "UIView") {
		var source = obj.source;
		source = FileManager.getPath(SystemSetting.pagesPath, source);
		var viewName = FileManager.getFileName(source);
		obj.type = viewName;
		runtime = obj.props.runtime;
		if (!runtime) {
			runtime = obj.props.runtime =
				CodeManager.getPackage(source) + "." + viewName + "UI";
		}
		viewMap[runtime] = runtime;
	} else {
		runtime = obj.props.runtime;
		if (runtime) {
			viewMap[runtime] = runtime;
		} else {
			var runClass;
			runClass = CodeManager.getRunClass(compType);
			if (runClass) {
				viewMap[compType] = compType;
			}
		}
	}
	if (compType == "EffectAnimation" && obj.props && obj.props.effect) {
		var effect = obj.props.effect;
		effect = FileManager.getPath(SystemSetting.pagesPath, effect);
		var effectName = FileManager.getFileName(effect);
		obj.props.runtime =
			CodeManager.getPackage(effect) + "." + effectName + "UI";
		obj.type = "Script";
		delete obj.props.effect;
		delete obj.props.skin;
		viewMap[obj.props.runtime] = obj.props.runtime;
	}
	delete obj.props.layers;
	delete obj.props.layer;
	delete obj.props.sceneWidth;
	delete obj.props.sceneHeight;
	delete obj.props.sceneColor;
	delete obj.props.sceneBg;
	delete obj.props.styleSkin;
	var list = obj.child;
	if (list)
		for (var j = 0, n = list.length; j < n; j++) {
			CodeManager.parseUIobj(list[j], viewMap);
		}
	CodeManager.cleanNodeAnimations(obj);
};

CodeManager.setObjDefaultValue = function(obj, props) {
	var prop;
	for (var $each_prop in props) {
		prop = props[$each_prop];
		var a = prop.split("=");
		if (a.length == 2) {
			var key = a[0];
			var val = a[1];
			if (!obj.props.hasOwnProperty(key)) {
				obj.props[key] = ObjectTools.getAutoValue(val);
			}
		}
	}
};

CodeManager.isLoadMode = false;
CodeManager.isAs = false;
CodeManager.uiObjMap = null;
CodeManager.projectExportType = null;
CodeManager.isUIPackMode = false;
CodeManager.uiDataExportFolder = null;
CodeManager.hasPreExportInfo = false;
CodeManager.isConfigsChanged = false;
CodeManager.preExportInfo = null;
CodeManager.prePageFileInfos = null;
CodeManager.tPageFileInfos = null;
CodeManager.ChangeTimeSign = "mTime";
CodeManager.HasSpecialSign = "hasSpecial";
CodeManager.ExportCodeSign = "code";
CodeManager.CodeType_AS = 0;
CodeManager.CodeType_JS = 2;
CodeManager.CodeType_JSInOne = 2;
CodeManager.CodeType_TS = 1;
CodeManager.tsCodePreFromImport = null;
CodeManager.tsCodePreImport = null;
CodeManager.allInOnePre = "";
CodeManager.importDic = {};
__static(CodeManager, [
	"configFiles",
	function() {
		return (this.configFiles = [".laya", "pageStyles.xml", "styles.xml"]);
	},
	"SpecialPageKeyWords",
	function() {
		return (this.SpecialPageKeyWords = [
			"preset",
			"UIView",
			"Script",
			"appendProps"
		]);
	},
	"pageFileSigns",
	function() {
		return (this.pageFileSigns = [
			".ani",
			".scene",
			".prefabui",
			".prefab",
			".gani",
			".efc",
			".ui"
		]);
	},
	"specialFiles",
	function() {
		return (this.specialFiles = [
			".png",
			"$down.png",
			"$bar.png",
			"$up.png"
		]);
	},
	"keysNeeded",
	function() {
		return (this.keysNeeded = {
			type: true,
			props: true,
			child: true,
			compId: true,
			animations: true
		});
	},
	"propkeysRemove",
	function() {
		return (this.propkeysRemove = {
			appendProps: true,
			preset: true,
			presetID: true,
			presetPre: true,
			presetIDPre: true
		});
	},
	"NumKeys",
	function() {
		return (this.NumKeys = { fontSize: true, stateNum: true });
	}
]);
