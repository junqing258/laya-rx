
import { DButtonDecorator as $btn } from "common/Custom";
import { subscribeStore, setGameStatus, setStoreState, getDataByKey, getBetScope, getMaxBet } from "ctrl/playCtrl";
import { checkLogin, toLogin } from "utils/util";

const { Event, Handler } = Laya;

let playStatus;
export default class AmFooter extends ui.fragment.FooterUI {

    static getInstance() {
        if (!this.instance||this.instance.destroyed) this.instance = new this();
        return this.instance;
    }
    
    constructor() {
        super();
        this.bottom = 0;
        this.zOrder = 9;
        this.init();
    }

    init() {
        let $btnPlay = $btn(this.btnPlay),
            $btnMinus = $btn(this.btnMinus),
            $btnAdd = $btn(this.btnAdd),
            $btnMax = $btn(this.btnMax);

        $btnPlay.on(Event.CLICK, this, ()=> {
            if (!checkLogin()) return toLogin();
            if (!$btnPlay.isForbid) setGameStatus("PLAY_START");
        });

        $btnMinus.on(Event.CLICK, this, ()=> {
            if (!checkLogin()) return toLogin();
            let betAmount = getDataByKey("bet");
            let step = getBetScope(betAmount, true);
            if (betAmount>100) {
                setStoreState({"bet": betAmount-step});
            }
        });
        $btnAdd.on(Event.CLICK, this, ()=> {
            if (!checkLogin()) return toLogin();
            let betAmount = getDataByKey("bet");
            let step = getBetScope(betAmount, false);
            if (betAmount < getMaxBet()) {
                setStoreState({"bet": betAmount+step});
            }
        });
        $btnMax.on(Event.CLICK, this, ()=> {
            if (!checkLogin()) return toLogin();
            let betAmount = getDataByKey("bet");
            let step = getBetScope(betAmount, false);
            let maxbet = getMaxBet();
            if (betAmount < maxbet) {
                setStoreState({"bet": maxbet});
            }
        });

        subscribeStore("gameStatus", (data)=> {
            playStatus = data;
            switch (data) {
                case "PLAY_ING":
                case "PLAY_START":
                    $btnPlay.isForbid = true;
                    break;
                case "PLAY_END":
                    $btnPlay.isForbid = false;
                    break;
                default:
                    break;
            }
        }, this);

        subscribeStore("bet", (data)=> {
            this.betLabel.text = data;
            let maxbet = getMaxBet(),
                minbet = 100;
            $btnAdd.isForbid = $btnMax.isForbid = data>=maxbet;
            $btnMinus.isForbid =  data<=minbet;
        }, this);

        subscribeStore("winAll", (data)=> {
            this.winLabel.text = data;
        }, this);

    }

}
