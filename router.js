const https = require("https");
const url = require("url");
const { DataBase } = require("./services");
const uid = require('uid');

module.exports = https.createServer((request, response) => {
  const langDB = new DataBase("./users.csv", [
    "id",
    "name",
    "description",
    "rate"
  ]);
  const queryRegEx = /\/languages\/([0-9a-z]+)/;
  console.log(request);
  //const langDB = db.dbInit("./users.csv", ["id", "name", "description", "rate"]);
  const requestUrl = url.parse(request.url, true);
  const queryData = requestUrl.pathname.match(queryRegEx);
  console.log(queryData);
  if (queryData) {
    switch (request.method) {
      case "GET": {
        const searchedEl = langDB.getElement(queryData[1]);
        if (searchedEl) {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify(searchedEl));
        } else {
          response.writeHead(404);
          response.end();
        }
        break;
      }
      case "PUT": {
        request.on("data", chunk => {
          const data = JSON.parse(chunk);
          langDB.updateElement(
            queryData[1],
            data.name,
            data.description,
            data.rate
          );
          response.writeHead(204);
          response.end();
        });
        break;
      }
      case "DELETE": {
        langDB.deleteElement(queryData[1]);
        response.writeHead(204);
        response.end();
        break;
      }
      default: {
        services.invalidRequest(res);
        break;
      }
    }
  } else {
    switch (request.method) {
      case "GET": {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(langDB.getAllElements());
        break;
      }
      case "POST": {
        request.on("data", chunk => {
          let language = JSON.parse(chunk);
          langDB.addElement(
            uid(),
            language.name,
            language.description,
            language.rate
          );
          response.statusCode = 204;
          response.end();
        });
        break;
      }
      default: {
        services.invalidRequest(response);
        break;
      }
    }
  }
});
