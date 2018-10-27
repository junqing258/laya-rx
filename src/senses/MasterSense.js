// @flow
import { MASTER_ASSET } from "const/assets";
import SenseManager, { sense } from "utils/SenseManager";
import { registeFnt } from "utils/util";
import Background from "components/Background";
import AmHead from "components/AmHead";
import AmFooter from "components/AmFooter";

const { Event } = Laya;

let inited = false;

@sense("/master")
export default class MasterSense extends Laya.Sprite {

    getAsset() {
        return MASTER_ASSET;
    }

    willMount() {
        if (!inited) {
            inited = true;
        }
    }

    constructor() {
        super();
        this.init();
    }

    init() {
        this.resizable(()=> {
            this.height = Laya.stage.height;
            this.width = Laya.stage.width;
        });

        let bgview = this.bgview = Background.getInstance();
        this.addChild(bgview);

        let head = AmHead.getInstance();
        this.addChild(head);

        let footer = AmFooter.getInstance();
        this.addChild(footer);
    }

    didMount() {
        let i = 0;
        let bgview = this.bgview;
        let observable = Rx.Observable.fromLayaEvent(bgview, Event.CLICK, this, ()=> i++);
        observable.throttle(1000).subscribe(val=> console.log(val));
    }

}