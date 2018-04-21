const fs    = require("fs");
const exec  = require('child_process').exec;
const async = require('async');


fs.readFile(`webAudio_mobile_mp3_sprite.json`, (err, data) => {
	let resdata = JSON.parse(data);
	let { clips, files, fileSizes } = resdata;
	let { freespin, additional, main } = clips;

	let audiokeys = Object.keys(additional);
	async.forEachSeries(audiokeys, function(b, done) {
		let item = additional[b];
		let { duration, start, volume} = item;
		let dc = `ffmpeg -i additional.mp3 -acodec copy -ss ${formateTime(start)} -t ${formateTime(duration)} additional/${b}.mp3`;
		var convert = exec(dc, function(error) {
			console.log(`${b} done!`);
			return done();
		});
	});
	
});


function formateTime(duration) {
	let min, seconds;
	min = Math.floor(duration/60);
	seconds = duration - min*60;
	if (seconds<10) seconds = "0"+seconds;
	return `00:0${min}:${seconds}`;
}

//var c = 'ffmpeg -ss 00:00:'+from+'.0 -t 00:00:'+duration+' -i octaves.wav -y '+wav;
//ffmpeg -i main.mp3 -acodec copy -ss 00:00:00 -t 00:03:00 half2.mp3
    