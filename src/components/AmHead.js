
import { subscribeStore, setStoreState, getDataByKey } from "ctrl/playCtrl";
import { toThousands, ellipsis } from "utils/util";

export default class AmHead extends ui.fragment.HeadUI {

    static getInstance() {
        if (!this.instance||this.instance.destroyed) this.instance = new this();
        return this.instance;
    }
    
    constructor() {
        super();
        this.init();
    }

    init() {
        subscribeStore("gameBase", (data)=> {
            this.yuLabe.text =  ellipsis( toThousands( data.get("gameScore") ), 12);
            this.douLabe.text = ellipsis( toThousands ( data.get("TCoin") ), 9);
        }, this);
    }

}
