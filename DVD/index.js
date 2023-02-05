//Ezekiel Goh
//P2205881
//DIT/FT/1B/08
var serveStatic = require("serve-static");

var app = require("./controller/app.js");


var port = 3000;

app.use(serveStatic(__dirname + "/public"));
var server = app.listen(port, function () {
  console.log("Web App Hosted at http://localhost:%s", port);
});
