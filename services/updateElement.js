const {getDataStream} = require('../helpers');
const {dataWriter} = require('../helpers');

module.exports = function updateElement(langId, request, response) {
    request.on("data", chunk => {
      const { name, description, rate } = JSON.parse(chunk);
      let results = [];
      let isUpdated = false;
      const streamData = getDataStream();
  
      streamData.on("data", data => {
        if (data.ID == langId) {
          isUpdated = true;
          data = {
            ID: langId,
            Name: name,
            Description: description,
            Rate: rate
          };
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
  }