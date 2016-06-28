var del = require("del");

del("typings").then(paths => {
	console.log("Reloading typings files is Done.");
});