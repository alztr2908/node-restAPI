const http = require("http");
const url = require("url");

module.exports = http.createServer((req, res) => {
  var userOps = require("./controller.js");
  const reqUrl = url.parse(req.url, true);
  const userId = parseInt(reqUrl.query.id);

  // Middleware
  console.log("Request type: " + req.method + " Endpoint: " + req.url);

  // GET all users and single user endpoint
  if (reqUrl.pathname == "/users" && req.method === "GET") {
    // Find users by ID if defined
    if (userId) {
      userOps.getUser(req, res, userId);
    } else {
      userOps.getUsers(req, res);
    }
  }

  // POST user (create user)
  else if (reqUrl.pathname == "/users" && req.method === "POST") {
    userOps.createUser(req, res);
  }

  // PUT user (update user)
  else if (reqUrl.pathname == "/users" && req.method === "PUT") {
    if (userId) {
      userOps.updateUser(req, res, userId);
    } else {
      userOps.invalidUrl(req, res);
    }
  }

  // DELETE user
  else if (reqUrl.pathname == "/users" && req.method === "DELETE") {
    if (userId) {
      userOps.deleteUser(req, res, userId);
    } else {
      userOps.invalidUrl(req, res);
    }
  }

  // invalid URL
  else {
    userOps.invalidUrl(req, res);
  }
});
