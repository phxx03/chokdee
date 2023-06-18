// const sql = require("./db.js");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      personnel_role: {
        type: Sequelize.STRING
      },
      personnel_username: {
        type: Sequelize.STRING
      },
      personnel_email: {
        type: Sequelize.STRING
      },
      personnel_password: {
        type: Sequelize.STRING
      },
      personnel_fname: {
        type: Sequelize.STRING
      },
      personnel_lname: {
        type: Sequelize.STRING
      },
      personnel_caedID: {
        type: Sequelize.STRING
      },
      personnel_phone: {
        type: Sequelize.STRING
      },
      personnel_img: {
        type: Sequelize.STRING
      }
    });
    
    return User;

};