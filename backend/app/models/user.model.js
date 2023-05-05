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
//----------------------------------------------------

// const sql = require("./db.js");

// constructor
// const Users = function(users) {
//   this.personnel_username = users.personnel_username;
//   this.personnel_email = users.personnel_email;
//   this.personnel_password= users.personnel_password;
//   this.personnel_fname= users.personnel_fname;
//   this.personnel_lname= users.personnel_lname;
//   this.personnel_caedID= users.personnel_caedID;
//   this.personnel_phone= users.personnel_phone;
//   this.personnel_img= users.personnel_img;
//   this.personnel_role= users.personnel_role;
  
// };

// Users.create = (newUsers, result) => {
//   sql.query("INSERT INTO Users SET ?", newUsers, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created Users: ", { id: res.insertId, ...newUsers });
//     result(null, { id: res.insertId, ...newUsers });
//   });
// };


// // Users.login = (req, result) => {
// //   sql.query("SELECT * FROM Users WHERE personnel_username = ? AND personnel_password= ?",[req.body.username,req.body.password], (err, res) => {
// //     if (err) {
// //       console.log("error: ", err);
// //       result(err, null);
// //       return;
// //     }

// //     if (res.length) {
// //       console.log("found tutorial: ", res[0]);
// //       result(null, res[0]);
// //       return;
// //     }

// //     // not found Tutorial with the id
// //     result({ kind: "not_found" }, null);
// //   });
// // };

// Users.findById = (id, result) => {
//   sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found product: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Product with the id
//     result({ kind: "not_found" }, null);
//   });
// };

// Users.getAll = (result) => {
//   let query = "SELECT * FROM users";
  
//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("Users: ", res);
//     result(null, res);
//   });
// };


// Users.updateById = (id, users, result) => {
//   sql.query(
//     "UPDATE Users SET personnel_username = ?, personnel_email = ?, personnel_password = ?, personnel_fname = ?, personnel_lname = ?, personnel_caedID = ?, personnel_phone = ?, personnel_img = ? WHERE id = ?",
//     [users.personnel_username,
//       users.personnel_email,
//       users.personnel_password,
//       users.personnel_fname,
//       users.personnel_lname,
//       users.personnel_caedID,
//       users.personnel_phone,
//       users.personnel_img,
//       id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated Users: ", { id: id, ...users });
//       result(null, { id: id, ...users });
//     }
//   );
// };

// Users.remove = (id, result) => {
//   sql.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted Users with id: ", id);
//     result(null, res);
//   });
// };

  
// return User;

// };

// // module.exports = Users;