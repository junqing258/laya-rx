(function() {

    Laya.Node.prototype.set = function(param) {
        var self = this;
        Object.keys(param).forEach(function(key, i) {
            self[key] = param[key];
        });
        return self;
    };

    Laya.Sprite.prototype.resizable = function(cb) {
        var self = this,
            stage = Laya.stage;
        if (!stage || typeof cb !== "function") return;
        cb();
        var _resizeCb = function() {
            if (self.resizeTimer) return;
            self.resizeTimer = true;
            setTimeout(function() {
                self.resizeTimer = false;
            }, 300);
            if (!self || self.destroyed) {
                stage.off("resize", null, _resizeCb);
            } else if (self.displayedInStage !== false) {
                cb();
            }
        };
        stage.on("resize", null, _resizeCb);
    };

    Laya.Stage.prototype._changeCanvasSize = function() {
        var rotation = false;
        var browserWidth = Laya.Browser.width;
        var browserHeight = Laya.Browser.height;
        if (this._screenMode !== "none") {
            var screenType = browserWidth / browserHeight < 1 ? "vertical" : "horizontal";
            rotation = screenType !== this._screenMode;
            if (rotation) {
                var temp = browserHeight;
                browserHeight = browserWidth;
                browserWidth = temp;
            }
        }
        var scaleMode;
        switch (this._screenMode) {
            case "horizontal":
                scaleMode = browserWidth / browserHeight > 1334 / 750 ? Laya.Stage.SCALE_SHOWALL : Laya.Stage.SCALE_FIXED_WIDTH;
                break;
            case "vertical":
                scaleMode = browserWidth / browserHeight < 750 / 1334 ? Laya.Stage.SCALE_SHOWALL : Laya.Stage.SCALE_FIXED_HEIGHT;
                break;
            default:
                scaleMode = Laya.Stage.SCALE_SHOWALL;
                break;
        }
        this._scaleMode = scaleMode;
        this.setScreenSize(Laya.Browser.clientWidth * Laya.Browser.pixelRatio, Laya.Browser.clientHeight * Laya.Browser.pixelRatio);
    };

    Laya.BoneSlot.prototype.replaceDisplayByIndex = function(tarIndex, newIndex) {
        if (!this.currSlotData) return;
        this._replaceDic[tarIndex] = newIndex;
        if (this.displayIndex == tarIndex) {
            this.showDisplayByIndex(newIndex);
        }
    };

    Laya.Templet.ASSETPATHS = [];
    Laya.Templet.TEMPINDEXS = [];
    /**
     * @public
     * 创建骨骼动画
     * @param {String} path 骨骼动画路径
     * @param {Number} rate 骨骼动画帧率，引擎默认为30，一般传24
     * @param {Number} type 动画类型 0,使用模板缓冲的数据，模板缓冲的数据，不允许修改  （内存开销小，计算开销小，不支持换装） 1,使用动画自己的缓冲区，每个动画都会有自己的缓冲区，相当耗费内存 （内存开销大，计算开销小，支持换装） 2,使用动态方式，去实时去画 （内存开销小，计算开销大，支持换装,不建议使用）
     * @return Skeleton骨骼动画
     */
    Laya.Templet.createSkeleton = function(path, rate, type) {
        rate = rate || 24;
        type = type || 0;
        var png = Laya.loader.getRes(path + '.png');
        var sk = Laya.loader.getRes(path + '.sk');
        if (!png || !sk) {
            console.error('资源没有预加载:' + path);
            return null;
        }
        var paths = Laya.Templet.ASSETPATHS;
        var tempIndexs = Laya.Templet.TEMPINDEXS;
        let index = Laya.Templet.ASSETPATHS.indexOf(path),
            templet;
        if (index === -1) {
            var resourcesLen = Laya.Resource._loadedResources.length;
            templet = new Laya.Templet();
            let len = paths.length;
            paths[len] = path;
            tempIndexs[len] = resourcesLen;
            templet.parseData(png, sk, rate);
        } else {
            templet = Laya.Resource._loadedResources[tempIndexs[index]];
        }
        return new Laya.Skeleton(templet, type);
    };

    Laya.Graphics.prototype.drawRoundRectComplex = function(x, y, w, h, rTL, rTR, rBR, rBL, fillStyle) {
        var max = (w < h ? w : h) / 2;
        var mTL = 0,
            mTR = 0,
            mBR = 0,
            mBL = 0;
        if (rTL < 0) { rTL *= (mTL = -1); }
        if (rTL > max) { rTL = max; }
        if (rTR < 0) { rTR *= (mTR = -1); }
        if (rTR > max) { rTR = max; }
        if (rBR < 0) { rBR *= (mBR = -1); }
        if (rBR > max) { rBR = max; }
        if (rBL < 0) { rBL *= (mBL = -1); }
        if (rBL > max) { rBL = max; }
        this.drawPath(x, y,
            [
                ["moveTo", w - rTR, 0],
                ["arcTo", w + rTR * mTR, -rTR * mTR, w, +rTR, rTR],
                ["lineTo", w, +h - rBR],
                ["arcTo", w + rBR * mBR, +h + rBR * mBR, w - rBR, +h, rBR],
                ["lineTo", rBL, +h],
                ["arcTo", x - rBL * mBL, +h + rBL * mBL, x, +h - rBL, rBL],
                ["lineTo", x, +rTL],
                ["arcTo", x - rTL * mTL, -rTL * mTL, rTL, 0, rTL],
                ["closePath"]
            ], { fillStyle: fillStyle });
    };
    Laya.Graphics.prototype.drawRoundRect = function(x, y, w, h, radius, fillStyle) {
        return this.drawRoundRectComplex(x, y, w, h, radius, radius, radius, radius, fillStyle);
    };


    Laya.URL.customFormat = function(url) {
        let rsversion = window.IMG_VERSION || "20171011";
        if (!Laya.Render.isConchApp && url.indexOf("?v=") < 0 && url.indexOf("data:image") < 0) {
            url += ("?v=" + rsversion);
        }
        return url;
    };


    Rx.Observable.fromLayaEvent = function(element, eventName, caller, selector) {
        if (typeof element.on === 'function' && typeof element.off === 'function') {
            return Rx.Observable.fromEventPattern(
                function(h) { element.on(eventName, caller, h); },
                function(h) { element.off(eventName, caller, h); },
                selector
            );
        }
    };

}());