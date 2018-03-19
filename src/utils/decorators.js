
export function instance(target) {
   target.getInstance = function() {
   		if (!target.instance||target.instance.destroyed) target.instance = new target();
   		return target.instance;
   };
}

export let PopupCofig = {
	onloadding: function() {},
	onloaded: function() {}
};
export function popup(target) {
	target.getInstance = function() {
		if (target.prototype.getAsset && !target.prototype.hasLoaded) {
            let asset = target.prototype.getAsset();
            target.instance = {};
            target.instance.popup = ()=> {
				PopupCofig.onloadding();
                Laya.loader.load(asset, Laya.Handler.create(null, ()=> {
                    target.hasLoaded = true;
                    target.instance = new target();
					PopupCofig.onloaded();
                    target.instance.popup();
                }));
            };
			target.instance.show = ()=> {
                Laya.loader.load(asset, Laya.Handler.create(null, ()=> {
                    target.prototype.hasLoaded = true;
                    target.instance = new target();
                    target.instance.show();
                }));
            };
        } else if (!target.instance || target.instance.destroyed) target.instance = new target();
        return target.instance;
	}
}

export function login(target, property, decorators, descriptor, context) {
	let func = target[property];
	return function() {
		return func.apply(this, arguments);
	}
}