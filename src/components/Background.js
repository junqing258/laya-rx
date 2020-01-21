
import { PubSub } from "ctrl/playCtrl";

const { Tween, Ease, Event } = Laya;

export default class Background extends Laya.Sprite {

    static getInstance() {
        if (!this.instance||this.instance.destroyed) this.instance = new this();
        return this.instance;
    }

    constructor() {
        super();
        let bgtexture = Laya.loader.getRes("bg/bg.jpg");
        this.graphics.drawTexture(bgtexture, 0 , 0);
        this.init();
        this.once(Event.ADDED, this, ()=> {
            this.initTreeAndGrass();
            this.initCharacter();
        });
    }

    static useMode(type) {
        
    }

    init() {
        let self = this, stage = Laya.stage;
        this.pivot(stage.width/2, stage.height/2);
        this.pos(stage.width/2, stage.height/2);
        const jello = [-12.5, 6.25, -3.125, 1.5625, -0.78125, 0.390625, -0.1953125, -0.097, 0];
        
        let i = 0;
        const interval = 60, degree = 2.5;
        /*PubSub.on("SHOCK_LINE", this, ()=> {
            i = 0;
            Laya.timer.loop(interval, this, loop);
        });*/

        function loop() {
            if (i>=jello.length) return Laya.timer.clear(self, loop); 
            let c = jello[i] * degree;
            let sc = (1 + Math.abs(c/90)) * 1;
            Tween.to(self, { rotation: c*1.2 , scaleX: sc, scaleY: sc }, interval, Ease.sineOut, null, 0, true);
            i++;
        }
    }

    initTreeAndGrass() {
        let wrapView = this.parent;
        let grass = new Laya.Image();
        grass.bottom = 50;
        grass.skin = "bg/grass.png";
        grass.zOrder = 1;
        wrapView.addChild(grass);

        let tree = new Laya.Image();
        tree.set({ right: 0, bottom: 130 });
        tree.skin = "bg/tree.png";
        wrapView.addChild(tree);
    }

    initCharacter() {
        let wrapView = this.parent;
        let character = new Laya.Image();
        character.set({ x: 35, bottom: 130 });
        character.skin = "bg/characterIdle.png";
        wrapView.addChild(character);
    }

}