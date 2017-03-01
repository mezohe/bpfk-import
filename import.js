var yaml = require("node-yaml");
var bpfk = require("./bpfk.js");
var fs = require("fs");

process.argv.forEach(function (arg, index) {
	if (index < 2) return;
	var page = fs.readFileSync(arg, {encoding: "utf8"});
	var obj = JSON.parse(page);
	if (obj.query && obj.query.pages) {
		var cmavo = Object.keys(obj.query.pages)
			.map((a) => obj.query.pages[a])
			.filter((a) => a.revisions && a.revisions.length)
			.map((a) => bpfk.parse(a.revisions[0]["*"] + "\n"))
			.reduce((a, b) => a.concat(b), []);
		cmavo.forEach(function (cmavo) {
			var name = cmavo.word;
			console.log(name);
			delete cmavo.word;
			yaml.writeSync(name + ".yaml", {[name]: cmavo});
		});
	}
});
