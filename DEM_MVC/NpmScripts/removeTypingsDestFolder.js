var del = require("del");

del("wwwroot/TypingsForTypeScript").then(paths => {
	console.log("Start reloading typings files.");
});