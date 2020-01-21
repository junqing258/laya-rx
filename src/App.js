
import "utils/laya.custom.js";
import "ui/layaUI.max.all.js";

import SenseManager from "utils/SenseManager";
import { COMMON_ASSET } from "const/assets";

const { Stage, Handler } = Laya;

export default function App() {
    var stage;
    Laya.init(1334, 750, Laya.WebGL);
    stage = Laya.stage;
    stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
    stage.alignH = Stage.ALIGN_CENTER;
    stage.alignV = Stage.ALIGN_MIDDLE;
    stage.screenMode = Stage.SCREEN_HORIZONTAL;
    stage.bgColor = "#46ABFC";

    Laya.loader.load(COMMON_ASSET, Handler.create(null, ()=> {
        if (window.bigRender) window.bigRender.clear();
        SenseManager.loadSense('/loadding');
    }));
}
