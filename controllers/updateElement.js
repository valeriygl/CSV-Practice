const { updateElement } = require("../services");
const { urlParser } = require("../helpers");

module.exports = function getElements(request, response) {
  const parsedUrl = urlParser(request);

  if (parsedUrl) {
    updateElement(parsedUrl[1], response);
  } else {
    response.statusCode = 404;
    response.end();
  }
};
