const csvWriter = require("csv-write-stream");
const fs = require("fs");
const { tableHeaders, filePath } = require("../config");

module.exports = function dataWriter(results) {
  const writeFile = fs.createWriteStream(filePath);
  const writer = csvWriter({
    headers: tableHeaders
  });

  writer.pipe(writeFile);
  results.forEach(data => writer.write(data));
};
