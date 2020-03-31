const uid = require("uid");
const csvWriter = require("csv-write-stream");
const fs = require("fs");
module.exports = function addElement(request, response) {
  request.on("data", chunk => {
    let { name, description, rate } = JSON.parse(chunk);

    const writeFile = fs.createWriteStream("./user.csv", { flags: "a" });
    const writer = csvWriter({ sendHeaders: false });

    writer.pipe(writeFile);
    writer.write({
      ID: uid(),
      name: name,
      description: description,
      rate: rate
    });
    writer.end();
  });
  request.on("error", err => console.error(err));
};
