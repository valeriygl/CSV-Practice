const https = require("http");
const {
  createElement,
  updateElement,
  getElements,
  deleteElement
} = require("../controllers");

module.exports = https.createServer((request, response) => {


    switch (request.method) {
      case "GET": {
        getElements(request, response);
        break;
      }
      case "POST": {
        createElement(request, response);
        break;
      }
      case "PUT": {
        updateElement(request,response);
        break;
      }
      case "DELETE": {
        deleteElement(request,response);
        break;
      }
      default: {
        response.statusCode = 404;
        response.end();
        break;
      }
    }
   
});
