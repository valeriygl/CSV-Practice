const router = require("./router");
const { port } = require("./config");
const https = require("http");
//const fs = require("fs");
//const host = 'localhost';

//const options = {
//  key: fs.readFileSync("key.pem"),
//  cert: fs.readFileSync("сert.pem")
//};

module.exports = https
  .createServer(router)
  .listen(port, () => console.log(`Server is listening on port ${port}`));
