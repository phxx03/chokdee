module.exports = app => {
  const { authJwt } = require("../middleware");
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users/all", users.allAccess);

  app.get(
    "/api/users/user",
    [authJwt.verifyToken],
    users.userBoard
  );

  app.get(
    "/api/users/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    users.moderatorBoard
  );

  app.get(
    "/api/users/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.adminBoard
  );

  //------------------

  // Create a new Tutorial
  router.post("/", users.create);

  // Retrieve all Tutorials
  router.get("/", users.findAll);

  // Retrieve all published Tutorials
  // router.get("/published", users.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);

  // Update a Tutorial with id
  router.put("/:id", users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Delete all Tutorials
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};

//---------------------------------------------

// module.exports = app => {
//   const users = require("../controllers/user.controller.js");

//   var router = require("express").Router();

//   // Create a new Tutorial
//   router.post("/create", users.create);
//   router.post("/update/:id", users.update);
//   router.get("/delete/:id", users.delete);
//   router.post("/login", users.login);
//   router.get("/user", users.userall);


//   app.use('/api/users', router);

// };

//------------------------------------------------
// module.exports = app => {
//   const users = require("../controllers/user.controller.js");

//   var router = require("express").Router();

//   // Create a new Tutorial
//   router.post("/", users.create);

//   // Retrieve all Tutorials
//   router.get("/", users.findAll);

//   // Retrieve all published Tutorials
//   router.get("/published", users.findAllPublished);

//   // Retrieve a single Tutorial with id
//   router.get("/:id", users.findOne);

//   // Update a Tutorial with id
//   router.put("/:id", users.update);

//   // Delete a Tutorial with id
//   router.delete("/:id", users.delete);

//   // Delete all Tutorials
//   router.delete("/", users.deleteAll);

//   app.use('/api/tutorials', router);
// };