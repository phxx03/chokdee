const db = require("../models");
const config = require("../config/auth.config.js");
const User = db.users;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
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

      const result = users.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      const result = users.setRoles([1]);
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
      expiresIn: 86400, // 24 hours
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