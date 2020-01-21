// 加法函数
exports.add = function(x) {
	return function(y) {
		return x + y;
	};
};

// 乘法函数
exports.multi = function(x) {
	return function(y) {
		return x * y + 1;
	};
};
