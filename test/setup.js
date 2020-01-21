


window.GM = {
    userLogged: true,
    user_id: 111
};
window.gameId = 123;
Laya.URL.BasePath = "./";
Laya.Config.version = "1504614495787";
window.websocketurl = "ws://localhost:3000";
window.token = "";
window.publicKey =
    "\
        MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbOLOB5z6T1aG5yVe6S1UJzbH4\
        iSUoRB/ETx/YGmMqRwE1XneulWxBeg2eeEKs+jFbFj0QiM4AmZnusFC/tgz3Qyzs\
        ArDsnaUhKoF01GwLZL6VkgYefAowYLAfO4LmRhO8L0sflkw2HfjpgyfumqXLR/nO\
        4aaOlQp584uKP1zU/wIDAQAB\
        ";

import "../src/utils/laya.custom.js";

function App() {
    const { Stage } = Laya;
    var stage;
    Laya.init(1334, 750, Laya.WebGL);
    stage = Laya.stage;
    stage.scaleMode = Stage.SCALE_FIXED_WIDTH;
    stage.alignH = Stage.ALIGN_CENTER;
    stage.alignV = Stage.ALIGN_MIDDLE;
    stage.screenMode = Stage.SCREEN_HORIZONTAL;
    stage.bgColor = "#46ABFC";
}

window.addEventListener("load", App);
