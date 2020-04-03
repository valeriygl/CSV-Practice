const { getElement, getAllElements } = require("../services");
const { urlParser } = require("../helpers");
const url = require("url");

module.exports = function get(request, response) {
  const requestUrl = url.parse(request.url, true);
  const parsedUrl = urlParser(request);

  if (parsedUrl) {
    getElement(parsedUrl[1], response);
  } else {
    if (requestUrl.path == "/languages") {
      getAllElements(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  }
};
