const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    let users = await User.findOne({
      where: {
        personnel_username: req.body.personnel_username
      }
    });

    if (users) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    // Email
    users = await User.findOne({
      where: {
        personnel_email: req.body.personnel_email
      }
    });

    if (users) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Username!"
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;