const csvWriter = require("csv-write-stream");
const fs = require("fs");

module.exports = function dataWriter(results) {
    const writeFile = fs.createWriteStream("./user.csv");
    const writer = csvWriter({
      headers: ["ID", "Name", "Description", "Rate"]
    });
    
    writer.pipe(writeFile);
    results.forEach(data => writer.write(data));
}