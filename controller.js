const url = require("url");
let users = require("./userData.js");

exports.getUsers = function (req, res) {
  const reqUrl = url.parse(req.url, true);
  let response = [
    {
      message: "Here are the list of users ",
    },
    users,
  ];

  res.statusCode = 200;
  res.setHeader("content-Type", "Application/json");
  res.end(JSON.stringify(response));
};

exports.getUser = (req, res, id) => {
  const user = users.find((u) => u.id === id);

  // User is found
  if (user) {
    let response = [user];
    res.statusCode = 200;
    res.setHeader;
    res.end(JSON.stringify(response));
  } else {
    let response = [
      {
        message: "User not found",
      },
    ];
    res.statusCode = 404;
    res.setHeader("content-type", "Application/json");
    res.end(JSON.stringify(response));
  }
};

exports.createUser = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    postBody = JSON.parse(body);
    let response = [
      {
        message: "User added successfully",
      },
      postBody,
    ];

    users.push(postBody);

    res.statusCode = 201;
    res.setHeader("content-type", "Application/json");
    res.end(JSON.stringify(response));
  });
};

exports.updateUser = (req, res, id) => {
  const userIndex = users.findIndex((obj) => obj.id == id);
  let response;

  if (userIndex !== -1) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      postBody = JSON.parse(body);
      response = [
        {
          message: "User updated successfully",
        },
        postBody,
      ];

      // Update logic here - destructuring
      users[userIndex] = { ...users[userIndex], ...postBody };

      res.statusCode = 201;
      res.setHeader("content-type", "Application/json");
      res.end(JSON.stringify(response));
    });
  } else {
    response = [
      {
        message: "User not found",
      },
    ];
    res.statusCode = 404;
    res.setHeader("content-type", "Application/json");
    res.end(JSON.stringify(response));
  }
};

exports.deleteUser = (req, res, id) => {
  const user = users.find((u) => u.id === id);

  if (user) {
    users = users.filter((u) => u !== user);
    let response = [
      {
        message: `User ${id} has been deleted`,
      },
      users,
    ];
    res.statusCode = 200;
    res.setHeader("content-type", "Application/json");
    res.end(JSON.stringify(response));
  } else {
    let response = [
      {
        message: "User not found",
      },
    ];
    res.statusCode = 404;
    res.setHeader("content-type", "Application/json");
    res.end(JSON.stringify(response));
  }
};

exports.invalidUrl = (req, res) => {
  let response = [
    {
      message: "URL not found",
    },
  ];
  res.statusCode = 404;
  res.setHeader("content-type", "Application/json");
  res.end(JSON.stringify(response));
};
