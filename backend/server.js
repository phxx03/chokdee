const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin:[ "http://localhost:8100"]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");

db.sequelize.sync()
  // .then(() => {
  //   console.log("Synced db.");
  // })
  // .catch((err) => {
  //   console.log("Failed to sync db: " + err.message);
  // });

const Role = db.role;

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to hatacano application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// routes
require('./app/routes/auth.routes')(app);
require("./app/routes/user.routes")(app);
require("./app/routes/turorial.routes")(app);

// set port, listen for requests

//-------------------------------------------------------------

// const express = require("express");
// // const bodyParser = require("body-parser"); /* deprecated */
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//   origin:[ "http://localhost:8100","http://localhost:8101"]
// };

// app.use(cors());

// // parse requests of content-type - application/json
// app.use(express.json()); /* bodyParser.json() is deprecated */

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */
// app.use(express.static('uploads'));
// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

// //require("./app/routes/tutorial.routes.js")(app);
// require("./app/routes/user.routes.js")(app);
// require("./app/routes/turorial.routes")(app);
// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });