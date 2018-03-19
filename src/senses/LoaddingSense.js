
import SenseManager, { sense } from "utils/SenseManager";
import { MASTER_ASSET } from "const/assets";

import MasterSense from "senses/MasterSense";

const { Stage, Handler, Sprite, Tween } = Laya;

@sense("/loadding", false)
export default class LoaddingSense extends ui.senses.LoaddingUI {

    didMount() {
        this.progressVal = 0;
        this.listenProess();

        let asset = MasterSense.prototype.getAsset();

        let startTime = Date.now();
        Laya.loader.load(asset, Handler.create(this, () => {
            setTimeout(() => {
                SenseManager.loadSense("/master");
            }, Math.max(0, 750 - (Date.now() - startTime)));
        }), Handler.create(this, this.onloading, null, false));

    }

    onloading(progress) {
        this.progressVal = progress;
    }

    listenProess() {
        Laya.timer.frameOnce(1, this, () => {
            let progress = this.progressVal;
            let rates = parseInt(progress * 100);
            this.progressLabel.text =  `正在加载中...${ rates }%`;
            if (progress <= 0.99) {
                this.progressBar.width = Math.max(28, 850 * progress);
                this.listenProess();
            } else {
                this.progressBar.width = 850;
                this.progressLabel.text = `正在加载中...100%`;
            }
        });
    }

}