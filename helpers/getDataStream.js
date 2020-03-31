const fs = require('fs');
const csvParser = require('csv-parser')

function getDataStream() {
    return fs.createReadStream("./user.csv").pipe(csvParser());
  }

  module.exports = getDataStream;