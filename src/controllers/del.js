const { deleteElement } = require("../services");
const { urlParser } = require("../helpers");

module.exports = function del(request, response) {
  const parsedUrl = urlParser(request);

  if (parsedUrl) {
    deleteElement(parsedUrl[1], response);
  } else {
    response.statusCode = 404;
    response.end();
  }
};
