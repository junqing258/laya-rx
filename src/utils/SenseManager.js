
let curSense, curRouter, routerList = [], componentList = [], hisRouters = [], lockedHash = true;

let firstIn = true;
history.replaceState(null, null, "#");

export default class SenseManager {
    
    static reg(list) {
        list.forEach((v, i)=> {
            routerList[i] = v.router;
            let component = v.component;
            if (!component.getInstance) {
                component.getInstance = function() {
                    if (!component.instance||component.instance.destroyed) component.instance = new component();
                    return component.instance;
                };
            }
            componentList[i] = component;
        });
    }

    static loadSense(router, payload, cb) {
        let index = routerList.indexOf(router);
        if (index===-1) return console.warn(`${router} not registered`);
        if (curRouter && !curSense.actived) return console.warn(`${curRouter} not actived`);
        let preSense,
            preProto = componentList[index].prototype;
        let CurComponent = componentList[index];
        preProto.actived = false;
        lockedHash = true;
        let promiselist = [];
        if (curRouter && typeof curSense.willUnMount === "function") {
            let p1 = curSense.willUnMount();
            if (p1 instanceof Promise) promiselist.push(p1);
        };
        if (typeof preProto.willMount === "function") {
            let p2 =  preProto.willMount();
            if (p2 instanceof Promise) promiselist.push(p2);
        }
        if (typeof preProto.getAsset === "function" && !preProto.hasLoaded) {
            let asset = preProto.getAsset();
            let fontAssets = [];
            if (Array.isArray(asset) && !asset.hasLoaded && asset.length>0) {
                fontAssets = asset.filter(v=> v.type==="font");
                fontAssets.forEach(fontRes => {
                    let { url, type, name, setting } = fontRes;
                    if (Laya.Text._bitmapFonts && Laya.Text._bitmapFonts[name]) return;
                    let bitmapFont = new Laya.BitmapFont();
                    if (setting) Object.assign(bitmapFont, setting);
                    bitmapFont.loadFont(url);
                    Laya.Text.registerBitmapFont(name, bitmapFont);
                });
                let p3 = new Promise(resolve=> {
                    Laya.loader.load(asset, Laya.Handler.create(null, ()=> {
                        preProto.hasLoaded = true;
                        asset.hasLoaded = true;
                        resolve();
                    }));
                });
                promiselist.push(p3);
            }
        }
        if (promiselist.length>0) {
            if (CurComponent.hasHased) SenseManager.onloadding(); 
            Promise.all(promiselist).then(value=> {
                this.changeSense(router, CurComponent.hasHased, cb);
                SenseManager.onloaded(router);
            }, reason=> {
                SenseManager.onloaded(router);
            });
        } else {
            this.changeSense(router, CurComponent.hasHased, cb);
            SenseManager.onloaded(router);
        }
    }

    static changeSense(router, hasHased, cb) {
        let index = routerList.indexOf(router);
        let PrComponent = componentList[index];
        let preSense = PrComponent.getInstance();
        if (curRouter) {
            setTimeout(()=> {
                if (hasHased) this.pushHistory(curRouter);
                curSense.destroy(true);
                curRouter = router;
                curSense = preSense;
                curSense.actived = true;
            }, 0);
        } else {
            curRouter = router;
            curSense = preSense;
            curSense.actived = true;
        }
        if (hasHased) {
            if (firstIn) {
                history.replaceState(null, null, `#${router}`);
                firstIn = null;
            } else {
                location.hash = router;
            }
        }
        
        setTimeout(()=> lockedHash = false, 110);
        Laya.stage.addChildAt(preSense, 0);

        if (typeof cb==="function")  Laya.timer.frameOnce(1, null, ()=> cb());
        if (typeof preSense.didMount==="function") {
            Laya.timer.frameOnce(2, preSense, ()=> preSense.didMount());
        }
    }

    static getSenseCompent(router) {
        let index = routerList.indexOf(router);
        if (index===-1) return console.warn(`${router} not registered`);
        return componentList[index];
    }

    static getCurSense() {
        return curSense;
    }

    static getCurRouter() {
        return curRouter;
    }

    static goBack() {
        let router = hisRouters.pop();
        if (router) this.loadSense(router);
    }

    static pushHistory(router) {
        if (hisRouters.length>=20) hisRouters.shift();
        if (router) hisRouters.push(router);
    }

    static setHashRoter(router) {
        lockedHash = true;
        location.hash = router;
        setTimeout(()=> lockedHash = false, 110);
    }

}

let _initdefined = false;
export function sense(router, hasHased) {
    if (!_initdefined) {
        _initdefined = true;
        if (!SenseManager.onloadding) {
            SenseManager.onloadding = ()=> { SenseManager._isloadding = true; };
        } else {
            let _onloadding = SenseManager.onloadding;
            SenseManager.onloadding = ()=> {
                if (SenseManager._isloadding) return;
                _onloadding.apply(SenseManager, arguments);
                SenseManager._isloadding = true;
            };
        }
        if (!SenseManager.onloaded) {
            SenseManager.onloaded = ()=> { SenseManager._isloadding = false; };
        } else {
            let _onloaded = SenseManager.onloaded;
            SenseManager.onloaded = ()=> {
                if (!SenseManager._isloadding) return;
                SenseManager._isloadding = true;
                _onloaded.apply(SenseManager, arguments);
            };
        }
    }
    
    return function(target) {
        let i = routerList.length;
        routerList[i] = router;
        let component = target;
        component.hasHased = hasHased===false? false: true;
        if (!component.getInstance) {
            component.getInstance = function() {
                if (!component.instance||component.instance.destroyed) component.instance = new component();
                return component.instance;
            };
        }
        componentList[i] = component;
    };
}

window.addEventListener("hashchange", function() {
    if (lockedHash) return;
    let hash = location.hash;
    if (hash!==curRouter) {
        SenseManager.loadSense(hash.slice(1), null, null, true);
    }
});