const router = require("./router");
const { port } = require("./config");
const https = require("http");
//const host = 'localhost';

module.exports = https.createServer(router).listen(port);
//console.log(`running on http://${host}:${port}`);