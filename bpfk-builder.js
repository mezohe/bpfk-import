// // load peg.js and the file system module
var fs = require("fs")
var PEG = require("pegjs")
// // read peg and build a parser
var camxes_peg = fs.readFileSync("bpfk.js.peg").toString();
try {
	var camxes = PEG.buildParser(camxes_peg, {
		cache: true,
		trace: false,
		output: "source",
		allowedStartRules: ["doc"],
	});
} catch (e) {
	console.log(JSON.stringify(e));
	throw e;
}
// // write to a file
var fd = fs.openSync("bpfk.js", 'w+');
var buffer = new Buffer('var camxes = ');
fs.writeSync(fd, buffer, 0, buffer.length);
buffer = new Buffer(camxes);
fs.writeSync(fd, buffer, 0, buffer.length);
buffer = new Buffer("\n\nmodule.exports = camxes;\n");
fs.writeSync(fd, buffer, 0, buffer.length);
fs.close(fd);

