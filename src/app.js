const router = require("./router");
const { hostname, port } = require("./config");
const https = require("http");

module.exports = https.createServer(router).listen(port, hostname);
