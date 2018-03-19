import { env } from "./util";

export default class TSockect {
	
	constructor(props) {
		this.primus = null;
        this.cmd = {};
		this.data = {
            _commKey       : null,  //res加密公钥所用到的key
            token          : null,  //玩家token，在连接初始化时用于res生成公钥
            jwtToken       : null,  //res加密之后的玩家token，数据交互以此token为主
            publicKey      : null,  //res公钥   
            connectionUrl  : null,  //连接url
            encryptedString: null,  //res加密后的验证字符串
            isOpened       : false  //连接是否已经初始化过
        };
        Object.assign(this.data, props);
		this.init();
	}

	init() {
		if (this.inited) { return; }
        this.generateCommKey();
        this.generateEncryptedString();
        this.inited = true;
	}

	generateCommKey() {
		let self = this;
		try {
            self.keyCount = self.keyCount? self.keyCount+1: 0;
            self.data._commKey = Date.parse(new Date()).toString() + Date.parse(new Date()).toString() + Date.parse(new Date()).toString().substring(0, 6);
	    } catch (e) {
            Log.info("初始化commKey失败", e);
        }
	}

	generateEncryptedString() {
		let self = this;
        try {
            var params = "jwt=" + self.data.token + "&commKey=" + self.data._commKey;
            var jsencrypt = new JSEncrypt();
            jsencrypt.setPublicKey(self.data.publicKey);
            self.data.encryptedString = jsencrypt.encrypt(params);
        } catch (e) {
            Log.info("初始化encryptedString失败", e);
        }
    }

    connect() {
    	let self = this;
    	let primus;
    	try {
            primus = self.primus = Primus.connect(self.data.connectionUrl);
            primus.on('outgoing::url', function (url) {
                url.query = 'login=' + self.data.encryptedString;
            });
            primus.on('open', function () {
                self.online = true;
                Log.info("连接成功", self.data.connectionUrl);
            });

            primus.on('data', function (data) {
                self._onData(data);
            });
            primus.on('error', function (data) {
                self.online = false;
                Log.info("连接出错", self.data.connectionUrl);
            });
            primus.on('reconnect', function () {
                Log.info("重连中", self.data.connectionUrl);
            });
            primus.on('disconnect', function () {
                self.online = false;
                Log.info("连接断开", self.data.connectionUrl);
            });
            primus.on('end', function () {
                self.online = false;
                Log.info("连接已关闭", self.data.connectionUrl);
            });
        } catch (e) {
            self.primus = null;
            Log.info(e);
        }
    }

    _onData(data) {
        //解密
        var decryptstr = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(this.data._commKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        var dataString = decryptstr.toString(CryptoJS.enc.Utf8);
        var parsedData;
        try {
            parsedData = JSON.parse(dataString);
        } catch(e) {
            throw e;
        }

        if (env!=="product") {
            let data = /* JSON.parse(dataString)['res'] ||  */JSON.parse(dataString);
            Log.info("%c ↓ "+parsedData.cmd, "color:green", data);
        }
       

        //更新jwt token
        if ("conn::init"===parsedData.cmd || "incoming::init"===parsedData.cmd ) {
            this.data.jwtToken = parsedData.res;
        }
            
        if (parsedData.code) {
            parsedData.res = parsedData.res || {};
            parsedData.res.code = parsedData.code;
            parsedData.res.msg = parsedData.msg;
        }
        this.onData && this.onData(parsedData.cmd, parsedData);
    }

    send(cmd, params) {
        if (!this.online) {
            Log.info("%c ↑ "+cmd, "color:orange", params||"");
        } else {
            Log.info("%c ↑ "+cmd, "color:blue", params||"");
        }
        let requst = { cmd: cmd };
    	requst.params = params || {}; 
    	requst.params.token = this.data.jwtToken;
    	var encryptData = CryptoJS.AES.encrypt(JSON.stringify(requst), CryptoJS.enc.Utf8.parse(this.data._commKey), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        this.primus.write(encryptData.toString());
    }

}