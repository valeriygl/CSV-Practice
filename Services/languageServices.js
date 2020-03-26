const csvParser = require("csv-parser");
const csvWriter = require("csv-write-stream");
const fs = require("fs");

function getElements() {
  return fs.createReadStream("./users.csv").pipe(csvParser());
}
function appendElment(langId, langName, langDescription, langRate) {
  const writeFile = fs.createWriteStream("./users.csv", { flags: "a" });
  const writer = csvWriter({ sendHeaders: false });
  writer.pipe(writeFile);
  writer.write({
    ID: langId,
    name: langName,
    description: langDescription,
    rate: langRate
  });
  writer.end();
}
function dataWriter(results) {
  const writeFile = fs.createWriteStream("./users.csv");
  const writer = csvWriter({
    headers: ["ID", "Name", "Description", "Rate"]
  });
  writer.pipe(writeFile);
  results.forEach(data => writer.write(data));
  writer.end();
}
module.exports = {
  getElements,
  appendElment,
  dataWriter
};
