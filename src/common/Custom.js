
import Sound from "./Sound";
import { lightFilter } from "utils/util";

const AD_BTN = "btn.mp3";

const { Stage, Sprite, Image, Event, Handler, Text, Tween, Ease } = Laya;

export class DButton extends Laya.Sprite {
	
	constructor(skin, props) {
		super();
		props = props || {};
        this._skin = skin;
		let _itexture = Laya.loader.getRes(skin);
        let sw = _itexture.sourceWidth,
            sh = _itexture.sourceHeight;
        this.size(sw, sh);
        this.pivot(sw/2, sh/2);
        if (props.x) this.x = props.x + sw/2;
        if (props.y) this.y = props.y + sw/2;
		this.delay = props.delay || 300;
		this._opskin = props.opskin;
		this.aduio = props.aduio || AD_BTN;
		this.drawSkin(this._skin);
		this._init();
		return this;
	}

	_init() {
		this.cleared = false;
		this.on(Event.MOUSE_DOWN, this, this.handleTouchIn);
		this.on(Event.MOUSE_UP, this, this.handleTouchOver);
	}


	handleTouchIn() {
		if (this.isForbid||this.__clicked) { return false; }
        this.__clicked = true;
		this.filters = [this.holdFilter||lightFilter(0.80)];
		if (this.aduio) Sound.play(this.aduio);
        this.__inTimer = setTimeout(() => {
			this.filters = null;
            this.__clicked = false;
        }, 300);
	}

	handleTouchOver() {
		if (this.isForbid) { return false; }
		clearTimeout(this.__inTimer);
		this.filters = null;
        if (this.__clicked) {
        	// typeof this.handleClick === "function" && this.handleClick();
        	setTimeout(() => this.__clicked = false, this.delay);
        }
	}

}


export function DButtonDecorator(button, props) {
	// if (!button instanceof Sprite) { console.warn("cannot decorator button"); }
	let _this = button;
	if (_this.decorated) return _this;
	_this.decorated = true;
	props = props || {};
    _this.pivot(_this.width/2, _this.height/2);
    _this.x += _this.width/2;
	_this.y += _this.height/2;
	_this.aduio = props.aduio || AD_BTN;
	_this.delay = props.delay || 300;
	/* _this.on = function() {
		DButton.prototype.on.apply(_this, arguments);
		return _this;
	}; */

	_this.on(Event.MOUSE_DOWN, _this, (event) => {
		event.stopPropagation();
		DButton.prototype.handleTouchIn.call(_this);
	});
    _this.on(Event.MOUSE_UP, _this,  (event) => {
		event.stopPropagation();
		DButton.prototype.handleTouchOver.call(_this);
	});

	Laya.getset(false, _this, "isForbid", ()=> _this._isForbid, val=> {
		_this._isForbid = val;
		_this.filters = _this._isForbid? [_this.holdFilter||lightFilter(0.80)] : null;
	});
	
    return _this;
}

export class DInput extends Laya.Label {

	constructor() {
		super();
	}

	set value(val) {
		if (this._value == val) return;
		this._value = val;
		this._focusFlag = false;
		this.handleFocus();
	}
	get value() {
		return this._value;
	}

	setSize(width, height, padding) {
		this.size(width, height);
		this.fontSize = height;
	}

	focusIn() {
		Laya.timer.loop(500, this, this._syncInputFocus);
		this.handleFocus();
	}

	focusOut() {
		Laya.timer.clear(this, this._syncInputFocus);
		this.text = this.value||"" +"";
	}

	on(type, caller, listener, args) {
		if (type === Event.FOCUS) {
			this.handleFocus = listener.bind(caller, args);
			return this;
		} else {
			return super.on(type, caller, listener, args);
		}
	}

	_syncInputFocus() {
		this._focusFlag = !this._focusFlag;
		let value = this.value||"";
		this.text = this._focusFlag? value: value+"\|";
	}
}

export function DInputDecorator(input, props) {
	let _this = input;
	if (_this.decorated) return _this;
	_this.decorated = true;
	_this.focusIn  = () => DInput.prototype.focusIn.apply(_this, arguments);
	_this.focusOut = () => DInput.prototype.focusOut.apply(_this, arguments);
	_this.on = function() {	 DInput.prototype.on.apply(_this, arguments); };
	_this._syncInputFocus = ()=> DInput.prototype._syncInputFocus.apply(_this, arguments);
	Laya.getset(false, _this, "value", ()=> _this._value, val=> {
		_this._value = val;
	});
	return _this;
}