import { createSkeleton } from "utils/util";

let touchInArea = 0, panel;

const { Event } = Laya;

class BaseRocker extends Laya.Image {

    constructor() {
        super();
        this.mirror = false;
        // this.init();
        this.on(Event.ADDED, this, this.addedInit);
    }

    addedInit() {
        panel = Laya.stage;
        this.resetX = this.x;
        this.resetY = this.y;
        if (panel.initedAdded && !panel.destroyed) return;
        panel.initedAdded = true;
        panel.on(Event.MOUSE_DOWN, panel, (e)=> {
            touchInArea = (Laya.stage.mouseX < Laya.stage.width / 2)? 1: 2;
            if (touchInArea==1) {
                MoveRocker.getInstance().onStart(e);
            } else if (Laya.stage.mouseY > Laya.stage.height / 2) {
                AttackRocker.getInstance().onStart(e);
            }
        });
    }

    init(mirror) {
        this.mirror = mirror;
        this.size(270, 270);
        this.pivot(135, 135);
        this.skin = "res/game/rocker/bg.png";
        this.inner = new Laya.Image();
        this.inner.skin = "res/game/rocker/stick_move.png";
        this.inner.size(142, 142);
        this.inner.pivot(this.inner.width/2, this.inner.height/2);
        this.inner.pos(this.width/2, this.height/2);
        this.addChild(this.inner);
        return this;
    }

    onStart(e) {
        if (!this.active) return;
        this._touchId = e.touchId;
        
        if (this.name==="MoveRocker" || this.name==="AttackRocker") {
            this.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        }
        if (panel) {
            panel.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
            panel.on(Laya.Event.MOUSE_OUT, this, this.stop, [true]);
            panel.on(Laya.Event.MOUSE_UP, this, this.stop, [true]);
        }
        this.active && this.event('ROKER_START');
    }

    onMove(e) {
        if (e.touchId != this._touchId || this.destroyed) return;
        let r = this.width / 2;
        let disX = this.mouseX-r;
        let disY = this.mouseY-r;
        let dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));

        if (this._isDrag) {
            //超过半径的位移比例
            let selfMoveN = dis / r - 1;
            if (selfMoveN > 0) {
                let startX = this.x + selfMoveN * disX;
                let startY = this.y + selfMoveN * disY;
                this.pos(startX, startY);
            }
        }

        let n = Math.min(r/dis, 1);
        let changeX = n * disX;
        let changeY = n * disY;

        this.inner.x = r + changeX;
        this.inner.y = r + changeY;

        if(this.mirror){
            disX = -disX;
        }

        let rate = Math.min(dis/r, 1) * 100;
        let angle = Math.atan2(disY, disX);
        let direct = [Math.cos(angle)*rate, Math.sin(angle)*rate];
        direct = direct.map(v=> parseInt(v));
        
        this.direct = direct;
        this.rate = rate;
        this.angle = angle;
        if (Math.abs(this.rate)>50) this.moved = true;

        this.active && this.event('ROKER_MOVE', [{ direct, rate, angle }, this.moved]);

        if (this.touchInArea !== 1) {
            CancleBtn.getInstance().visible = true;
        }


    }

    stop(isExecute, e) {
        if (e.touchId != this._touchId || this.destroyed) return;
        isExecute = isExecute===false? false: true;
        if (!isExecute) this.direct = [0, 0];
        
        let { direct, rate, angle } = this;
        if (this.active) {
            this.event('ROKER_DONE', [{ direct, rate, angle }, this.moved, isExecute]);
        }
        this.reset();
    }

    reset() {
        this.moved = false;
        this.inner.pos(this.width / 2, this.height / 2);
        this.pos(this.resetX, this.resetY);
        if (panel) {
            panel.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
            panel.off(Laya.Event.MOUSE_OUT, this, this.stop);
            panel.off(Laya.Event.MOUSE_UP, this, this.stop);
        }
        CancleBtn.getInstance().visible = false;
    }

    cancle(e) {
        if (e.touchId != this._touchId) return;
        this.event('ROKER_CANCLE');
        this.stop(false, e);
    }

}

/**
 * 取消按钮
 */
export class CancleBtn extends Laya.Button {

    static getInstance() {
        if (!this.instance||this.instance.destroyed) this.instance = new this();
        return this.instance;
    }

    constructor() {
        super('res/game/ui/btn_cancle.png', "");
        this.stateNum = 1;
        this.visible = false;
        this.alpha = 0.5;
        this.on(Laya.Event.MOUSE_OVER, this, () => this.alpha = 1 );
        this.on(Laya.Event.MOUSE_OUT, this, () => this.alpha = 0.5 );
        this.on(Laya.Event.MOUSE_UP, this, this.cancleRoker);
    }

    cancleRoker(e) {
        AttackRocker.getInstance().cancle(e);
        SkillRocker.getInstance().cancle(e);
        this.visible = false;
    }

}

/**
 * 移动摇杆
 */
export class MoveRocker extends BaseRocker {

    static getInstance() {
        if (!this.instance||this.instance.destroyed) this.instance = new this();
        return this.instance;
    }

    constructor() {
        super();
        this.name = "MoveRocker";
        this.touchInArea = 1;
        this._isDrag = true;
    }

}

/**
 * 攻击摇杆
 */
export class AttackRocker extends BaseRocker {

    static getInstance() {
        if (!this.instance||this.instance.destroyed) this.instance = new this();
        return this.instance;
    }

    constructor() {
        super();
        this.name = "AttackRocker";
        this.touchInArea = 2;
        this.touchInType = 2;

        this.on(Event.MOUSE_DOWN, this,(e)=> {
            this.onStart(e);
        });
    }

    init (mirror) {
        super.init(mirror);
        this.inner.skin  = "res/game/rocker/stick_aim.png";
        return this;
    }
}

/**
 * 技能摇杆
 */
export class SkillRocker extends BaseRocker {

    static getInstance() {
        if (!this.instance||this.instance.destroyed) this.instance = new this();
        return this.instance;
    }

    constructor() {
        super();
        this.touchInArea = 2;
        this.touchInType = 3;
       
        this.on(Event.MOUSE_DOWN, this,(e)=> {
            e.stopPropagation()
            if (this.power>=1) this.onStart(e);
        });
    }

    init (mirror) {
        super.init(mirror);
        this.size(206, 206);
        this.skin = "res/game/rocker/bg_skill.png";
        this.inner.skin  = "res/game/rocker/stick_skill.png";
        this.inner.centerX = 0;
        this.inner.centerY = 0;
        this.inner.pivot(this.inner.width/2, this.inner.height/2);

        this.fullAni = createSkeleton("res/game/animation/btn_shine");
        this.fullAni.pos(103, 103);
        this.fullAni.play(0, true);
        this.addChildAt(this.fullAni, 1);

        this.accumul = new ui.Game.SkillChargeUI();
        this.accumul.scale(1.4, 1.4);
        this.accumul.centerX = 0;
        this.accumul.centerY = 0;
        
        this.setIcon(1);

        this.power = 0;

        return this;
    }

    set power(val) {
        if (this._power == val) return;
        this._power = val;
        let { startX, startY, radius, startAngle, power } = this;
        let graphics;
        graphics = this.accumul.groove.graphics;
        graphics.clear();
        if (val>=1) {
            this.status = 1;
        } else if (val>=0) {
            this.status = 0;
            graphics.drawPie(107/2, 107/2, 96/2, -90, -90 + val*360, "#f4bd00");
        }
    }

    get power() {
        return this._power;
    }

    set status(val) {
        if (this._status==val) return;
        this._status = val;
        if (val==1) {
            this.skin = "res/game/rocker/bg_skill.png";
            this.fullAni.visible = true;
            this.fullAni.play(0, true);
            if (this.accumul.parent) this.accumul.removeSelf();
        } else {
            this.skin = "";
            this.fullAni.visible = false;
            this.fullAni.stop();
            if (!this.accumul.parent) this.addChild(this.accumul);
        }
    }

    get status() {
        return this._status;
    }

    setIcon(no) {
        this.skillNum = no;
        let icon1 = new Laya.Image(`assets/role/${no}/skill/charge_fire.png`);
        let icon2 = new Laya.Image(`assets/role/${no}/skill/roker_fire.png`);
        icon1.centerX = icon2.centerX = 0;
        icon1.centerY = icon2.centerY = 0;
        this.accumul.addChild(icon1);
        this.inner.addChild(icon2);
    }
    
}



// WEBPACK FOOTER //
// ./src/game/ui/com/rocker.js