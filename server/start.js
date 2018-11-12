const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;
const express = require("express");

const socket = require("./socket");
// const router = express.Router();

let socket_start = false;

const app = express();

app.use(express.static("./", {
	dotfiles: "ignore",
	index: false,
	extensions: ["html"],
	setHeader: (res, path, stat)=> {

	}
}));

app.all("*", (req, res, next)=> {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("X-Powered-By", "PLANET");
	next();
});

app.get("/", (req, res, next)=> {
	if (req.query.act) {
		let data = fs.readFileSync(path.resolve(__dirname, './data/success.json')).toString();
		res.json(JSON.parse(data));
	} else {
		res.redirect("/bin/?id=3&debug_status=1");
	}
});

app.get("/bin", (req, res, next)=> {
	if (!req.query || !req.query.id) {
		res.header("charset", "utf-8" );
		res.send('<h2>Ã»ÓÐ´«id</h2>');
		return;
	}
	if (req.query.p) socket(app);
	res.type("html");
	res.sendFile(path.resolve(__dirname, "../bin/index.html"));
});

app.listen(8000, ()=> console.log("Open URL:","http://localhost:8000/"));
