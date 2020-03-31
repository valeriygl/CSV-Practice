const {dataWriter,getDataStream} = require('../helpers');

module.exports = function deleteElement(langId, response) {
    let results = [];
    let isDeleted = false;
    let streamData = getDataStream();
  
    streamData.on("data", data => {
      if (data.ID != langId) {
        results.push(data);
      } else {
        isDeleted = true;
      }
    });
    streamData.on("error", err => console.error(err));
  
    streamData.on("end", () => {
      if (isDeleted) {
        dataWriter(results);
        response.statusCode = 200;
        response.end();
      } else {
        response.statusCode = 404;
        response.end();
      }
    });
  }