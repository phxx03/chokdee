const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
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