const fs = require("fs");
const csvParser = require("csv-parser");
const { filePath } = require("../config");

module.exports = function getDataStream() {
  return fs.createReadStream(filePath).pipe(csvParser());
};
