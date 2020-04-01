const url = require("url");

module.exports = function urlParser(request) {
  const queryRegEx = /\/languages\/([0-9a-z]+)/;
  const requestUrl = url.parse(request.url, true);
  return requestUrl.pathname.match(queryRegEx);
};
