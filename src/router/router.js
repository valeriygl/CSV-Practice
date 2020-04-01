const { get, post, update, del } = require("../controllers");

const router = (request, response) => {
  switch (request.method) {
    case "GET": {
      get(request, response);
      break;
    }
    case "POST": {
      post(request, response);
      break;
    }
    case "PUT": {
      update(request, response);
      break;
    }
    case "DELETE": {
      del(request, response);
      break;
    }
    default: {
      response.statusCode = 404;
      response.end();
      break;
    }
  }
};

module.exports = router;
