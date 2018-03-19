// var express = require("express");
const fs          = require("fs");
const http        = require("http");
const Primus      = require("primus");
const CryptoJS    = require("crypto-js");
const NodeRSA     = require('node-rsa');
const querystring = require('querystring');

const publicKey = '\
-----BEGIN PUBLIC KEY-----\
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbOLOB5z6T1aG5yVe6S1UJzbH4\n\
iSUoRB/ETx/YGmMqRwE1XneulWxBeg2eeEKs+jFbFj0QiM4AmZnusFC/tgz3Qyzs\n\
ArDsnaUhKoF01GwLZL6VkgYefAowYLAfO4LmRhO8L0sflkw2HfjpgyfumqXLR/nO\n\
4aaOlQp584uKP1zU/wIDAQAB\n\
-----END PUBLIC KEY-----\
';
const privateKey = '\
-----BEGIN RSA PRIVATE KEY-----\n\
MIICXQIBAAKBgQCbOLOB5z6T1aG5yVe6S1UJzbH4iSUoRB/ETx/YGmMqRwE1Xneu\n\
lWxBeg2eeEKs+jFbFj0QiM4AmZnusFC/tgz3QyzsArDsnaUhKoF01GwLZL6VkgYe\n\
fAowYLAfO4LmRhO8L0sflkw2HfjpgyfumqXLR/nO4aaOlQp584uKP1zU/wIDAQAB\n\
AoGALWTRqmXUOSu61jh5vXOWdP2A1KxW/4WcvK5fI7Xj1lNZmR/9ZEMym5t0LCoD\n\
Zc7tbDP+u70mcap6CAHsO4SkGZ0VGjM3TKh8WuGnk+5sD2iudADaqjdDsXgQ2AkO\n\
KA4u+X8W/FujbB/BpD1c527ZYdjvbhrdd4GxRO7cJrE3LSECQQDwivvI3RANU2nG\n\
Cn7AoCm978hRFSsZ+vqQiIOfOsCjZIktSziRDHUqFfZO07EONHENJK6KtgOctEWu\n\
OTYHB9+nAkEApTImZcdcckd3dz0NBk5T+jzGKDH1TrFoW/HbpSzNxMjLpo0eryBJ\n\
r44o8IODdl28L4rLThpfOUt08Y8OSpRK6QJBAK+rcNJyz6RLxLXDOGqJDbMPCOZe\n\
ZUnmB1PCvw1spP8vDxerFbaouHBx9Z3/8BCFsAJ/RZE7+EtbRIBGe/SKhYUCQDet\n\
vIVneYBHGDwHRsGOWv2nyD46AG1inEMJNLfqbvxZlVJwlBwArPVP2/qcyQ13MHtx\n\
s26Csv+zsBnO1slKTCkCQQDACLABEatRKvA4FVpXFXQyNMjqFTplWaG/e2PaKqM3\n\
Elh0sbTJ1qF/5iyUzZaw75Z6LYl4jjDI03Nr9iD/vq+G\n\
-----END RSA PRIVATE KEY-----\
';


module.exports = function(app) {
	initExpress(app);

	let server = http.createServer( /*app*/ );
	let primus = Primus(server);
	let encryptedString, commonKey;

	server.listen(3000, () => console.log('listening on *:3000'));
	primus.on('open', data => console.log("连接成功", data));

	primus.on('connection', spark => {
		spark.emit("incoming::open");
		spark.on('data', data => {
			let txt = String(spark.query.login).replace(/\ /g, "+");
			let key = new NodeRSA(privateKey);
			key.setOptions({ encryptionScheme: "pkcs1" });
			let decrypted = key.decrypt(txt, "utf8");
			commonKey = getQueryString("commKey", decrypted);

			let parsedData = decryptDataFunc(data);
			console.log('received data:', parsedData);
			let cmd = parsedData.cmd || "conn::error";
			fs.readFile(`server/data/${cmd}.json`, 'utf8', (err, data) => {
				let resdata;
				if (err) {
					cmd = "conn::error", resdata = {
						"statusCode": "0000",
						"msg": "SYS_ERROR"
					};
				} else {
					resdata = JSON.parse(data);
				}
				spark.write(encryptDataFunc(resdata));
			});
		});
	});

	function encryptDataFunc(resdata) {
		let encryptData = CryptoJS.AES.encrypt(JSON.stringify(resdata), CryptoJS.enc.Utf8.parse(commonKey), {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return encryptData.toString();
	}

	function decryptDataFunc(data) {
		let decryptstr = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(commonKey), {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		let dataString = decryptstr.toString(CryptoJS.enc.Utf8);
		return JSON.parse(dataString);
	}

	function getQueryString(name, str) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = str.match(reg);
		if (r !== null) {
			return querystring.unescape(r[2]);
		}
		return null;
	};
};


function initExpress(app) {
	app.get("/", (req, res, next) => {
		if (req.query && req.query.act) {
			fs.readFile(`server/data/${req.query.act}.json`, 'utf8', (err, data) => {
				let resdata;
				if (err) {
					resdata = { "code": "1004", "msg": "SYS_ERROR" };
				} else {
					resdata = JSON.parse(data);
				}
				res.json(resdata);
			});
			return;
		}
		next();
	});
}