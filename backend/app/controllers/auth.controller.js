const db = require("../models");
const config = require("../config/auth.config.js");
const User = db.users;
const Role = db.role;
const uploadFile = require("../middleware/upload");
const path = require('path');
const fs = require('fs');
const BASE_DIR = process.cwd();
const baseUrl = '/uploads/';

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {
  try {
    const users = await User.create({
      personnel_fname: req.body.personnel_fname,
      personnel_lname: req.body.personnel_lname,
      personnel_caedID: req.body.personnel_caedID,
      personnel_phone: req.body.personnel_phone,
      personnel_email: req.body.personnel_email,
      personnel_username: req.body.personnel_username,
      personnel_img: req.body.personnel_img,
      personnel_role: req.body.personnel_role,
      personnel_password: bcrypt.hashSync(req.body.personnel_password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = await users.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      const result = await users.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const users = await User.findOne({
      where: {
        personnel_username: req.body.personnel_username,
      },
    });

    if (!users) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.personnel_password,
      users.personnel_password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: users.id }, config.secret, {
      expiresIn: 86400,
    });

    let authorities = [];
    const roles = await users.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    return res.status(200).send({
      id: users.id,
      personnel_username: users.personnel_username,
      personnel_email: users.personnel_email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};

exports.uploadFiles = (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    User.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        path.join(BASE_DIR, 'uploads', req.file.filename)
      ),
    }).then((image) => {
      fs.writeFileSync(
        path.join(BASE_DIR, 'uploads', image.name),
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

exports.getListFiles = (req, res) => {
  const directoryPath = path.join(BASE_DIR, 'uploads');

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

exports.download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = path.join(BASE_DIR, 'uploads');

  res.download(path.join(directoryPath, fileName), fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
