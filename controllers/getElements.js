const { getElement, getAllElements } = require("../services");
const { urlParser } = require("../helpers");

module.exports = function getElements(request, response) {
  const parsedUrl = urlParser(request);

  if (parsedUrl) {
    getElement(parsedUrl[1], response);
  } else {
    getAllElements(response);
  }
};
