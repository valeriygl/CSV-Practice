const { addElement } = require("../services");
const url = require("url");

module.exports = function post(request, response) {
  const requestUrl = url.parse(request.url, true);
  if (requestUrl.pathname == "/languages") {
    addElement(request, response);
    response.statusCode = 201;
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
  request.on("error", err => console.error(err));
};
