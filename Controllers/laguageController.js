const { getElements, appendElment, dataWriter } = require("../Services/languageServices");
const uid = require("uid");

function addElement(request, response) {
  request.on("data", chunk => {
    let {name,description,rate} = JSON.parse(chunk);
    console.log(name);
    //console.log(Name);
    if (
      typeof name === "string" &&
      typeof description === "string" &&
      typeof rate === "string"
    ) {
      appendElment(uid(), name, description, rate);
      response.statusCode = 201;
      response.end();
    } else {
      response.statusCode = 400;
      response.end();
    }
  });
}

function updateElement(langId, request, response) {
  request.on("data", chunk => {
    const {name,description,rate} = JSON.parse(chunk);
    console.log(name);
    let results = [];
  let isUpdated = false;
  const streamData = getElements();
  streamData.on("data", data => results.push(data));
  streamData.on("end", () => {
    results = results.map(data => {
      if (data.ID == langId) {
        isUpdated = true;
        return {
          ID: langId,
          Name: name,
          Description: description,
          Rate: rate
        };
      }
      return data;
    });
    if (isUpdated) {
      dataWriter(results);
      response.statusCode = 204;
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }
  });
  });
  
}

function getElement(langId, response) {
  let results = [];
  const streamData = getElements();
  streamData.on("data", data => results.push(data));
  streamData.on("end", () => {
    const res = results.find(data => data.ID == langId);
    if (res) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(results.find(data => data.ID == langId)));
    } else {
      response.statusCode = 404;
      response.end();
    }
  });
}

async function getAllElements(response) {
  let results = [];
  const streamData = getElements();
  streamData.on("data", data => results.push(data));
  streamData.on("end", () => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(results));
  });
}

function deleteElement(langId, response) {
  let results = [];
  let streamData = getElements();
  streamData.on("data", data => results.push(data));
  streamData.on("end", () => {
    let deletedResults = results.filter(data => data.ID != langId);
    if (deletedResults.length != results.length) {
      dataWriter(deletedResults);
      response.statusCode = 200;
      response.end();
    } else {
      response.statusCode = 404;
      response.end();
    }
  });
}

module.exports = {
  addElement,
  updateElement,
  getElement,
  getAllElements,
  deleteElement
};
