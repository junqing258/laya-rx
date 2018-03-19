
const { Stage, Sprite, Image, Event, Handler, Text, Tween, Ease, Browser } = Laya;

let queue = [];
export default class Tips extends Laya.Image {

    constructor() {
        super();
        this.skin = "common/tips.png";
        this.init();
    }
    
    static getInstance() {
        if (!this.instance || this.instance.destroyed) this.instance = new this();
        return this.instance;
    }

    init() {
        this.msgTxt = new Text();
        this.msgTxt.set({ color: "#ffed74", fontSize: 36, y: 8, font: "SimHei", width: 1067, align: "center", wordWrap: false });
        this.addChild(this.msgTxt);
    }

    show(msg) {
        if (this.showed) return queue.push(msg);
        this.showed = true;
		this._show(msg);
    }

    _show(msg) {
        let stage = Laya.stage;
        this.msgTxt.text = msg;
        this.pivot(534, 26);
        this.pos(stage.width/2, stage.height/2);
		this.set({ scaleX: 0.5, scaleY: 0.5, alpha: 0.7 });
		Tween.to(this,  { scaleX: 1, scaleY: 1, alpha: 1 }, 100, Ease.backOut);
		let maskLayer = this.maskLayer = new Sprite();
		maskLayer.zOrder = 999;
		this.zOrder = 1000;
		stage.addChildren(maskLayer, this);
        maskLayer.on(Event.MOUSE_DOWN, this, () => {} );

        this.resizable(()=> {
            maskLayer.size(stage.width, stage.height);
        });

		this.timer.once(3000, this, () => this.hide() );
    }

    hide() {
        Tween.to(this, { scaleX: 0.5, scaleY: 0.5, alpha: 0.7 }, 100,  Ease.backIn, Handler.create(this, () => {
			this.maskLayer.destroy();
			this.maskLayer = null;
			this.removeSelf();
			this.showed = false;
			if (queue.length>0) {
                for (let i=0,len=queue.length; i< len; i++) {
                    let msg = queue.shift();
                    if (this.msgTxt.text!==msg) {
                        return Laya.timer.once(800, this, ()=> this.show(msg) );
                    } 
                }
			}
		}));
    }

}