const {getDataStream} = require('../helpers')

module.exports = function getElement(langId, response) {
  let results = null;
  const streamData = getDataStream();

  streamData.on("data", data => {
    if (data.ID == langId) {
      results = data;
      streamData.end();
    }
  });
  streamData.on("end", () => {
    //const res = results.find(data => data.ID == langId);
    if (results) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(results));
    } else {
      response.statusCode = 404;
      response.end();
    }
  });
  streamData.on("error", err => console.error(err));
}


