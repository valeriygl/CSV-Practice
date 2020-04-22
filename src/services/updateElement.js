const dataWriter = require("./dataWriter");
const getDataStream = require("./getDataStream");

module.exports = function updateElement(langId, request, response) {
  request.on("data", chunk => {
    const updatedData = JSON.parse(chunk);
    let results = [];
    let isUpdated = false;
    const streamData = getDataStream();

    streamData.on("data", data => {
      if (data.ID == langId) {
        isUpdated = true;
        data = updatedData;
      }
      results.push(data);
    });
    streamData.on("end", () => {
      if (isUpdated) {
        dataWriter(results);
        response.statusCode = 204;
        response.end();
      } else {
        response.statusCode = 404;
        response.end();
      }
    });
  });
};
