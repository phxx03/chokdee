module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };

//----------------------------------------------------

// const sql = require("./db.js");

// // constructor
// const Users = function(users) {
//   this.username = users.username;
//   this.password = users.password;
//   this.role= users.role;
  
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


// Users.login = (req, result) => {
//   sql.query("SELECT * FROM Users WHERE username = ? AND password= ?",[req.body.username,req.body.password], (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found tutorial: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });
// };
// Users.getAll = ( result) => {
//   let query = "SELECT * FROM Users WHERE role='user'";

  
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
//     "UPDATE Users SET username = ?, password = ?, role = ? WHERE id = ?",
//     [users.username, users.password, users.role, id],
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


// module.exports = Users;