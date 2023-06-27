const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
var multer = require('multer');
const path = require('path');
const bodyParser = require("body-parser");

const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: ["http://localhost:8100"]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
// const initRoutes = require("./app/routes");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
// initRoutes(app);

db.sequelize.sync()
// .then(() => {
//   console.log("Synced db.");
// })
// .catch((err) => {
//   console.log("Failed to sync db: " + err.message);
// });

const Role = db.role;

// db.sequelize.sync().then(() => {
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
let fileNames = "";
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    var name = file.originalname.split(".")[0]
    var typefile = file.originalname.split(".")[1]
    fileNames = name + '-' + Date.now() + "." + typefile
    callback(null, fileNames);
  }
});
var upload = multer({ storage: storage }).single('file');

app.post('/api/auth/upload-image', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({ message: "Error upload file", status: false });
      fileNames = "";
    }
    res.json({ message: "upload file succeed", status: true, filename: fileNames });
    fileNames = "";
  });
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
require("./app/routes/order.routes")(app);

// set port, listen for requests

// สร้าง API เพื่อดึงข้อมูลรูปภาพจากฐานข้อมูล
app.get('/api/images/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT image FROM images WHERE id = ?';

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error retrieving image from database:', err);
      res.status(500).send('Error retrieving image');
      return;
    }

    if (result.length === 0) {
      res.status(404).send('Image not found');
      return;
    }

    const image = result[0].image;
    res.contentType('image/jpeg');
    res.send(image);
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
