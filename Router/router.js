const https = require("http");
const url = require("url");
const {
  addElement,
  updateElement,
  getElement,
  getAllElements,
  deleteElement
} = require("../Controllers/laguageController");

module.exports = https.createServer((request, response) => {
  const queryRegEx = /\/languages\/([0-9a-z]+)/;
  const requestUrl = url.parse(request.url, true);
  const queryData = requestUrl.pathname.match(queryRegEx);
  if (queryData) {
    switch (request.method) {
      case "GET": {
        getElement(queryData[1], response);
        break;
      }
      case "PUT": {
        updateElement(queryData[1], request, response);
        break;
      }
      case "DELETE": {
        deleteElement(queryData[1], response);
        break;
      }
      default: {
        response.statusCode = 404;
        response.end();
        break;
      }
    }
  } else {
    switch (request.method) {
      case "GET": {
        getAllElements(response);
        break;
      }
      case "POST": {
        addElement(request, response);
        break;
      }
      default: {
        response.statusCode = 404;
        response.end();
        break;
      }
    }
  }
});
