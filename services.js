const csv = require("csv-database");

class DataBase {
  constructor(fileName,fields) {
    this.db = csv(fileName,fields);
  }

addElement(langId, langName, langDescription, langRate) {
  this.db.add([
    {
      id: langId,
      name: langName,
      description: langDescription,
      rate: langRate
    }
  ]);
}

updateElement(langId, langName, langDescription, langRate) {
  this.db.edit(
    { id: langId },
    { name: langName, description: langDescription, rate: langRate }
  );
}

async getElement(langId) {
  return this.db.get({ id: langId });
}

async getAllElements() {
  return this.db.get();
}

deleteElement(langId) {
  this.db.delete({ id: langId });
}
}

module.exports = {
  DataBase
};
