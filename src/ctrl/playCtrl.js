import socket from "ctrl/socket";
import { NO_WINNING } from "const/config";
import { getUserId, checkLogin } from "utils/util";

export const PubSub = new Laya.EventDispatcher();

let initState = {
    gameStatus: "INIT",
    gameBase: {
        "gameScore": 0,
        "TCoin": 0
    },
    bet: 0,
    winAll: 0,
    bonusWin: 0,
    keyCounnt: 0,
    voiceOn: true,
    playResData: {},
    bounnceResData: {}
};

let gameStoreSub = new Rx.Subject();
const gameStore$ = gameStoreSub.scan((state, val) => {
    state = state.merge(val);
    return state;
}, Immutable.fromJS(initState));

export function subscribeStore(key, callback, component) {
    let observable = gameStore$;
    let subscription = observable.subscribe(state => {
        let data = state.get(key);
        if (component && component.destroyed) {
            subscription.dispose();
            subscription = null;
        } else if (subscription._prestate !== data) {
            subscription._prestate = data;
            callback.call(component, data, state);
        }
    });
    subscription.next(observable.seed);
    return subscription;
}



export function setStoreState(data) {
    gameStore$.seed = gameStore$.seed.merge(data);
    gameStoreSub.onNext(data);
}
export function setGameStatus(status) {
    gameStoreSub.onNext({ "gameStatus": status });
}

export function getDataByKey(key) {
    return gameStore$.seed.get(key);
}


export function addWinAll(data) {
    gameStoreSub.onNext({ "winAll": getDataByKey("winAll") + data });
}

////////////////////////////////////////////////////////////////////////////////////////

// 初始化复盘
export function getServerInitInfo() {

}

// play接口
export function playStart() {
    let betAmout = getDataByKey("bet");
    return Rx.Observable.create(observer => {
        socket.once("bet", rep => {
            if (rep.code == "0") {
                observer.onNext(rep.res.data);
                observer.onCompleted();
                let userid = getUserId();
                localStorage.setItem(`defaultBet${GM.gameId + userid}`, betAmout);
            } else {
                observer.onError(new Error("BetError"));
            }
        });
        socket.send("bet", {
            bet: betAmout,
            isAuto: 0
        });
    }).delay(500).timeout(5000, new Error('TimeOut'));
}


export function roundEnd() {
    gameStoreSub.onNext({
        "gameStatus": "PLAY_END",
        "winAll": 0,
        "bonusWin": 0
    });
}

export function gameException() {

}


export function getNoWinningGraph() {
    return NO_WINNING[Math.floor(Math.random() * NO_WINNING.length)];
}
/**
 * 押注额档次
 */
export function getBetScope(value, minus) {
    let s = [0, 100, 1000, 10000, 100000, 500000, Infinity];
    let b = [10, 100, 1000, 10000, 100000];
    let i = minus ? s.findIndex(v => v >= value) : s.findIndex(v => v > value);
    return b[Math.max(0, Math.min(i - 1, b.length - 1))];
}

export function getDefaultBet() {
    let userid = getUserId(),
        betAmount = 200;
    if (userid) {
        betAmount = parseInt(localStorage.getItem(`defaultBet${GM.gameId + userid}`));
        if (betAmount) return betAmount;
        let gameBase = getDataByKey("gameBase");
        let gameScore = gameBase.get("gameScore"),
            TCoin = gameBase.get("TCoin");
        let b = Math.max(100, getMaxBet() * 0.01),
            s = getBetScope(b);
        betAmount = b - b % s;
        return betAmount;
    }
    return betAmount;
}

export function getMaxBet() {
    let gameBase = getDataByKey("gameBase");
    let gameScore = gameBase.get("gameScore"),
        TCoin = gameBase.get("TCoin");
    return Math.min(Math.max(gameScore, TCoin), 500000);
}

let baseInint = true;
export function getGameBaseInfo() {
    if (!checkLogin()) return;
    axios.get(`?act=game_gamebase&st=queryUserAccount&gameId=${gameId}&Type=1`, { timeout: 5000 })
        .then(response=> {
            if (response.status == 200 && typeof response.data === "object") {
                setStoreState({ gameBase: response.data });
                if (baseInint) {
                    baseInint = null;
                    setStoreState({ bet:  getDefaultBet() });
                }
            }
        });
}
getGameBaseInfo();