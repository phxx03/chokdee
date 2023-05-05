// const db = require("../models/user.model.js");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
db.sequelize.sync();

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
//     personnel_username: req.body.personnel_username,
//     personnel_email: req.body.personnel_email,
//     personnel_password: req.body.personnel_password,
//     personnel_fname: req.body.personnel_fname,
//     personnel_lname: req.body.personnel_lname,
//     personnel_caedID: req.body.personnel_caedID,
//     personnel_phone: req.body.personnel_phone,
//     personnel_img: req.body.personnel_img,
//     personnel_role: req.body.personnel_role || "user"

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

//---------------------------------------------------
// const User = db.users;

// // Create and Save a new Tutorial
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.title) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }

//   // Create a Tutorial
//   const user = new User({
//     // title: req.body.title,
//     // description: req.body.description,
//     // published: req.body.published ? req.body.published : false
//     personnel_username: req.body.personnel_username,
//     personnel_email: req.body.personnel_email,
//     personnel_password: req.body.personnel_password,
//     personnel_fname: req.body.personnel_fname,
//     personnel_lname: req.body.personnel_lname,
//     personnel_caedID: req.body.personnel_caedID,
//     personnel_phone: req.body.personnel_phone,
//     personnel_img: req.body.personnel_img,
//     personnel_role: req.body.personnel_role || false
//   });

//   // Save Tutorial in the database
//   User.create(user)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the User."
//       });
//     });
// };

// // Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {

//   User.getAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     else res.send(data);
//   });
// };


// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
//   User.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Product with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving User with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   User.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating User with id=" + id
//       });
//     });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   User.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${id}. Maybe User was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete User with id=" + id
//       });
//     });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Users were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all users."
//       });
//     });
// };

// // Find all published Tutorials
// // exports.findAllPublished = (req, res) => {
  
// // };

//---------------------------------------------

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.personnel_username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const user = {
    // title: req.body.title,
    // description: req.body.description,
    // published: req.body.published ? req.body.published : false
    personnel_username: req.body.personnel_username,
    personnel_email: req.body.personnel_email,
    personnel_password: req.body.personnel_password,
    personnel_fname: req.body.personnel_fname,
    personnel_lname: req.body.personnel_lname,
    personnel_caedID: req.body.personnel_caedID,
    personnel_phone: req.body.personnel_phone,
    personnel_img: req.body.personnel_img,
    personnel_role: req.body.personnel_role
  };

  // Save Tutorial in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const personnel_username = req.query.personnel_username;
  var condition = personnel_username ? { personnel_username: { [Op.like]: `%${personnel_username}%` } } : null;

  console.log("เข้ามาแล้วนะ")

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };