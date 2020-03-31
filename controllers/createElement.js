const {addElement} = require('../services')

module.exports = function createElement(request, response) {
  addElement(request, response);
  request.on("end", () => {
    response.statusCode = 201;
    response.end();
  });
  request.on("error", err => console.error(err));
};
