
const { Stage, Sprite, Image, Event, Handler, Text, Label, Tween, Ease, Browser } = Laya;


const SKIN = {
    "confirm": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAWlBMVEUAAADMQkLLQkLLQkL9Y2PLQkLLQkL9Y2PMQkL9Y2PLQkLLQkLdTk75YGD7YmL9Y2P2Xl77YmL9Y2P9Y2P9Y2PLQkL9Y2PLQkL3Xl7cTU3tWFj5YGDoVVXmVFTAQB7jAAAAFnRSTlMA4qyPiltUU9sGBvr59e3cyl/fplYHf9H6ogAAAJVJREFUKM/lzFkOhCAQRdEHCs5TD1WAuv9ttm00xii1Ae/vSS7Wis/7Ree6DHtZRzelm6Z0XyrpUvY/U7S2QNFSvAEDCfXoJW7QkBTooTzK7CR1CBIH1BLXyIX7qKB9nL2G4TmmMxuUiqd7nVh9Acvs3RWdZ7ZYSpjZB3eysCAnwOaXDgVsfsXcAnul0ao6qFLalCv8AOM4RjeBMUEAAAAAAElFTkSuQmCC",
    "delete": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAb1BMVEUAAADLy8ttbGzMzMzMzMxtbGzMzMxtbGzMzMxtbGzMzMxubW3MzMxtbGxtbGyQj4/MzMxtbGxtbGzMzMzMzMzMzMzMzMzMzMzMzMxwb29tbGzMzMxtbGzBwcGtra2NjIy/vr6goKCPjo6kpKSko6Pen5mzAAAAG3RSTlMA/N2piVtVVAYGA+ParPr54ZSKW1Hz5OPf2quDrJY6AAAAqklEQVQoz9XPSQ6DMBBE0TKEeR4yum0Dyf3PGCARLLA76/ztk0oqrMWhfxNy65z7YYytPpeH8v6L6UlaO6Urz+rwRUPpLATiq5svMTrJ1MHn2EfNcQ3BsYBk+2P+8XvgWEFzrFFxXOGumO0MD+NmUyCg0aUjBUgyetn1SVkCRETG8m4wRBHmWiKatBI7CaUnImqxlDZkrUnxKfKO6EXYSoLCK3cqvSJIVngDsvlU0+yaOfMAAAAASUVORK5CYII=",
    "number": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAeFBMVEUAAADGxsa3t7f///////////////////+3t7e3t7fo6Oi3t7fT09P///////+3t7e6urr///+3t7f///+3t7e3t7f///////////////+3t7e3t7f///+3t7fQ0ND29vb19fX7+/v39/fo6Ojh4eHe3t65ubm4uLiqIy5xAAAAHHRSTlMABeKJVQb64VtV/Prp5NvbrqysppSKW1Hz11xTZZ6wfwAAAKVJREFUKM/d00cSgzAQRNEWOefgIIkM97+hMbhwuUBzAP/tq1nMorFlGrlt8aPbPTdMHNURPxXVH2Q6v0xnG6+q8LcaXJkBmKGaQxMVJ6qQUpzCptiGRbEFTva/3FHaoaW4gUexh4DiAEmv1j6BI9UsH2DapNJJY4C7jNc6Li7WSiHbM7ZSlPsMCjHLofn5d5CzKBj2nrE4Fbs4Yk6m+V/ytczZT1+rJlhgr8lBXAAAAABJRU5ErkJggg=="
};

const KEYS = [
    { value: "0", x: 810, y: 15 },
    { value: "1", x: 20, y: 15 },
    { value: "2", x: 280, y: 15 },
    { value: "3", x: 545, y: 15 },
    { value: "4", x: 20, y: 99 },
    { value: "5", x: 280, y: 99 },
    { value: "6", x: 545, y: 99 },
    { value: "00", x: 810, y: 99 },
    { value: "7", x: 20, y: 183 },
    { value: "8", x: 280, y: 183 },
    { value: "9", x: 545, y: 183 },
    { value: ".", x: 810, y: 183 },
    { value: "confirm", x: 1070, y: 15, height: 156, color: "#ffffff" },
    { value: "delete", x: 1070, y: 183 }
];

export default class Keyboard extends Laya.Component {

    constructor(props) {
        super();
        this.width = 1334;
        this.height = 266;
        this.bottom = 0;
        this.zOrder = 1999;
        this.bgPanle = new Sprite();
        this.inputValue = props.curVal || "";
        this.validate = props.validate;
        this.maxLength = props.maxLength;
        this._init();
    }

    _init() {
        this.bgPanle.graphics.drawRect(0, 0, this.width, this.height, "#000000");
        this.bgPanle.alpha = 0.7;
        this.addChildAt(this.bgPanle, 0);
        KEYS.forEach(item => {
            let key = new Key(item);
            this.addChild(key);
        });

        this.on("KEY_CLICK", this, (textValue) => {
            let val = this.inputValue;
            if ("." === textValue) { return; }
            let si = String(this.inputValue);
            if ("confirm" === textValue) {
                this.event("INPUT_VALUE", this.inputValue);
                this.close();
            } else if ("delete" === textValue) {
                this.inputValue = si.length > 1 ? si.substr(0, si.length - 1) : "";
                this.event("INPUT_VALUE", this.inputValue);
            } else {
                if ("." === textValue && si.indexOf(".") > -1) return;
                // if (si.indexOf(".") > -1 && si.indexOf(".") < si.length - 2) { return; }
                if (this.maxLength && (""+si+textValue).length > this.maxLength) return;
                this.inputValue = si + textValue;
                this.event("INPUT_VALUE", String(this.inputValue));
            }
        });

    }

    open(value) {
        let stage = Laya.stage;
        this.inputValue = value;
        this.maskLayer = new Sprite();
        this.maskLayer.zOrder = this.zOrder - 1;
        this.maskLayer.size(stage.width, stage.height);
        stage.addChildren(this.maskLayer, this);
        this.event("open");
        this.maskLayer.on(Event.CLICK, null, () => this.close());
    }

    close() {
        this.event("close");
        this.maskLayer.destroy();
        this.timer.once(5, this, () => {
            this.destroy(true);
        });
    }


}

class Key extends Laya.Image {

    constructor(props) {
        super();
        this.x = props.x;
        this.y = props.y;
        this.sizeGrid = "10,10,10,10";
        this.textValue = props.value;
        let _i = ["confirm", "delete"].indexOf(this.textValue);
        this.width = 245;
        this.height = props.height || 69;
        this.skin = _i > -1 ? SKIN[this.textValue] : SKIN["number"];
        var text = new Text();
        text.set({ width: 50, height: 44, text: this.textValue, bold: true, align: "center", valign: "middle", fontSize: 32, color: props.color || "#000000", x: 98, y: (this.height - 44) / 2 - 4 });
        text.text = _i > -1 ? ["确认", "删除"][_i] : this.textValue;

        this.addChild(text);
        this._init(props);
    }

    _init(props) {
        if (super._init) super._init();
        this.on(Event.MOUSE_DOWN, this, this.handleTouchIn);
        this.on(Event.MOUSE_UP, this, this.handleTouchOver);
    }

    handleClick() {
        this.parent && this.parent.event("KEY_CLICK", this.textValue);
    }

    handleTouchIn() {
        if (this.isForbid || this.__clicked) { return false; }
        this.__clicked = true;
        this.filters = [this.holdFilter || lightFilter(0.7)];

        this.clickTimer = setTimeout(function () {
            this.filters = null;
            this.__clicked = false;
        }, this.delay);
        function lightFilter(n) {
            n = n || 0;
            var lightMat = [
                n, 0, 0, 0, 0,
                0, n, 0, 0, 0,
                0, 0, n, 0, 0,
                0, 0, 0, 1, 0
            ];
            return new Laya.ColorFilter(lightMat);
        }
    }


    handleTouchOver() {
        if (this.isForbid) { return false; }
        clearTimeout(this.clickTimer);
        this.filters = null;
        if (this.__clicked) {
            typeof this.handleClick === "function" && this.handleClick();
            setTimeout(() => this.__clicked = false, this.delay);
        }
    }

}

//