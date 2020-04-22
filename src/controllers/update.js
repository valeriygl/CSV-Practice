const { updateElement } = require("../services");
const { urlParser } = require("../helpers");

module.exports = function update(request, response) {
  const parsedUrl = urlParser(request);

  if (parsedUrl) {
    updateElement(parsedUrl[1], request, response);
  } else {
    response.statusCode = 404;
    response.end();
  }
};
