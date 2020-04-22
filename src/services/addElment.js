const uid = require("uid");
const csvWriter = require("csv-write-stream");
const fs = require("fs");
const { tableHeaders,filePath } = require("../config");

module.exports = function addElement(request, response) {
  request.on("data", chunk => {
    let { name, description, rate } = JSON.parse(chunk);
    const writeFile = fs.createWriteStream(filePath, { flags: "a" });
    const writer = csvWriter({ headers: tableHeaders, sendHeaders: false });
    writer.pipe(writeFile);
    writer.write([uid(), name, description, rate]);
    writer.end();
  });
  request.on("error", err => console.error(err));
};
