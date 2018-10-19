export class BulletPool {
	static getItemByClass(sign, cls) {
		let pool = BulletPool.getPoolBySign(sign);
		let args = Array.prototype.slice.call(arguments, 2);
		let rst = pool.length ? pool.pop() : new cls(...args);
		rst["__InPool"] = rst["recovered"] = false;
		return rst;
	}
	static getItemByCreateFun(sign, createFun) {
		let pool = BulletPool.getPoolBySign(sign);
		let args = Array.prototype.slice.call(arguments, 2);
		let rst = pool.length ? pool.pop() : createFun(...args);
		rst["__InPool"] = rst["recovered"] = false;
		return rst;
	}
	static getPoolBySign(sign) {
		return BulletPool._poolDic[sign] || (BulletPool._poolDic[sign] = []);
	}
	static recover(sign, rst) {
		if (rst["__InPool"]) {
			Laya.Tween.clearAll(rst);
			rst.parent && rst.removeSelf();
			return;
		}
		rst["__InPool"] = rst["recovered"] = true;
		['path', 'ex', 'ey', 'bid', 'launcher'].forEach(key => rst[key] = null);
		setTimeout(() => {
			if (rst.destroyed) return;
			Laya.Tween.clearAll(rst);
			rst.parent && rst.removeSelf();
			BulletPool.getPoolBySign(sign).push(rst);
		}, 32);
	}
}
BulletPool._poolDic = {};