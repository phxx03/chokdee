exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

//------------------------------------------------------------

// const Users = require("../models/user.model.js");

// // Create and Save a new Users
// exports.create = (req, res) => {

//   console.log("aaaaaaaaaaa")
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   // Create a Tutorial
//   const users = new Users({
//     username: req.body.username,
//     password: req.body.password,
//     role: req.body.role || "user"

//   });

//   // Save Users in the database
//   Users.create(users, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Users."
//       });
//     else res.send(data);
//   });
// };


// exports.login = (req, res) => {
//   console.log(req.body)
//   Users.login(req, (err, data) => {
//     if (err)
//       res.send({ message: "User not_found" })
//     else res.send({ message: JSON.stringify(data) });
//   });
// };
// exports.userall = (req, res) => {

//   Users.getAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Users.updateById(
//     req.params.id,
//     new Users(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Users with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Users with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// exports.delete = (req, res) => {
//   Users.remove(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Users with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Users with id " + req.params.id
//         });
//       }
//     } else res.send({ message: `Users was deleted successfully!` });
//   });
// };