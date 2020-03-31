const {getDataStream} = require("../helpers/");

module.exports = function getAllElements(response) {
  let results = [];
  const streamData = getDataStream();

  streamData.on("data", data => results.push(data));
  streamData.on("end", () => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(results));
  });
  streamData.on("error", err => console.error(err));
}


