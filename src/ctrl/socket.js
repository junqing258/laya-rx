import { env } from 'utils/util';
import TSocket from "utils/TSockect";

let socket = new TSocket({
	'connectionUrl': window.websocketurl,
	'token': window.token,
	'publicKey': window.publicKey
});
export default socket;

socket.connect();

let dispatcher = new Laya.EventDispatcher();

socket.onData = (cmd, res) => {
	switch (cmd) {
		case "conn::error":
			if (res && res.code == "1003") {
				/*socket.passivityClose();
				Confirm.getInstance().popup("您已在其它地点登录", {
					align: "center",
					close: ()=> location.reload()
				});*/
			}
			break;
		case "error":
			Log.error(cmd, res);
			break;
		default:
			dispatcher.event(cmd, [res]);
			break;
	}
};
socket.on = function(type,listener,args,caller) {
	return dispatcher.on.apply(type,caller,listener,args);
};
socket.once = function(type,listener,args,caller) {
	return dispatcher.once(type,caller,listener,args);
};
socket.off = function(type,listener,onceOnly,caller) {
	return dispatcher.off(type,caller,listener,args);
};
socket.send = function() {
	if (!socket.online) return null;
	return TSocket.prototype.send.apply(socket, arguments);
};


if (env !== 'product') window.DEVIO = socket;