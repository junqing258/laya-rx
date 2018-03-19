
import { getCharLength } from "utils/util";
import { DButtonDecorator as $btn, DButton } from "view/common/Custom";

const { Event } = Laya;

export default class Confirm extends ui.popup.ConfirmUI {

    constructor() {
        super();
        this.init();
    }

    static getInstance() {
        if (!this.instance || this.instance.destroyed) this.instance = new this();
        return this.instance;
    }

    init() {
        $btn(this.btnClose).on(Event.CLICK, this, ()=> {
            this.close();
        });
        $btn(this.btnCancel).on(Event.CLICK, this, ()=> {
            this._cancelCallback();
        });
        $btn(this.btnSure).on(Event.CLICK, this, ()=> {
            this._sureCallback();
        });
    }

    show(msg, props) {
        return this.popup(msg, props);
    }

    popup(msg, props) {
        props = props || { type: 1 };
        props.type = props.type || 1;
        this.showed = true;
        let { btnSure, btnCancel, countLable, msgCont } = this;
        msgCont.align = (props.align) || (getCharLength(msg)>=18*2? "left": "center");
        msgCont.text = msg;
        if (props.countdown) {
            this.countdown = props.countdown;
            props.type = 3;
        }
        this.curType = props.type;
        switch(props.type) {
            case 2:
                btnSure.x = 512+105;
                btnCancel.visible = true;
                countLable.visible = false;
                btnCancel.skin = "common/btn_cancle.png";
                break;
            case 3:
                btnSure.x = 512+105;
                btnCancel.visible = true;
                countLable.visible = true;
                btnCancel.skin = "common/btn_cancle2.png";
                countLable.text = props.countdown;
                Laya.timer.loop(1000, this, this.counTick);
                break;
            case 5:
                btnSure.x = 512+105;
                btnCancel.visible = true;
                countLable.visible = false;
                btnCancel.skin = "common/btn_cancle.png";
                break;
            case 1:
            default:
                btnSure.x = 317+105;
                btnCancel.visible = false;
                break;
        }
        this._sureCallback = typeof props.sure==="function"? function() {props.sure(), this.close();}: ()=> this.close();
        this._cancelCallback = typeof props.cancle==="function"? function() {props.cancle(), this.close();}: ()=> this.close();
        this._closeCallback = props.close;
        super.popup();
    }

    counTick() {
        this.countdown--;
        let { countLable } = this;
        if (this.countdown>=0) {
            countLable.text = this.countdown;
        } else {
            this.close();
        }
    }

    close() {
        Laya.timer.clearAll(this);
        if (typeof this._closeCallback==="function") this._closeCallback();
        this.showed = false;
        super.close();
    }

}