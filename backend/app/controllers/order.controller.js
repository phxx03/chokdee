const Order = require("../models/order.model.js");
const Product = require("../models/tutorial.model.js");



// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  let nextOrder_id = 1;
  Order.nextorder(async (err, res) => {
    console.log("getNextOrder:", res);
    await req.body.order_data.forEach(element => {
      console.log("........", element)
      const order = new Order({
        order_id: res,
        order_Product_ID: element.id,
        order_Product_Quantity: element.product_cartselect,
        order_Customer: req.body.order_Customer,
        order_Customer_Contact: req.body.order_Customer_Contact,
        order_Customer_Address: req.body.order_Customer_Address,
        order_Type_Delivery: req.body.order_Type_Delivery,
        order_Type_Pay: req.body.order_Type_Pay,
        order_Product_total_Price: element.product_price * element.product_cartselect,
        order_User_ID: req.body.order_User_ID,
        order_Date: req.body.order_Date || false

      });
      Order.create(order, (err, createdOrder) => {
        if (err) {
          // Handle error
          res.status(500).send({
            message: "Error creating Order"
          });
        } else {
          if (!createdOrder) {
            // Handle error if order creation was not successful
            res.status(500).send({
              message: "Order creation failed"
            });
          } else {
            // Return success response
            // res.send({ message: "Order placed successfully" });
          }
        }
      });
    });
  })
};


// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Order.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    else res.send(data);
  });
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
  Order.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Order.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Order.updateById(
    req.params.id,
    new Order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Order with id " + req.params.id
          });
        }
      } else {
        // Update the delivery status here
        Order.updateDeliveryStatus(req.params.id, req.body.order_Delivery_Status, (err, result) => {
          if (err) {
            res.status(500).send({
              message: "Error updating delivery status for Order with id " + req.params.id
            });
          } else {
            res.send({ message: "Order updated successfully" });
          }
        });
      }
    }
  );
};



// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Order.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Order with id " + req.params.id
        });
      }
    } else res.send({ message: `Order was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Order.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders."
      });
    else res.send({ message: `All Orders were deleted successfully!` });
  });
};

// แสดงลิสต์ order_id ทั้งหมด
exports.getAllOrderIds = (req, res) => {
  Order.getAllOrderIds((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล order_id'
      });
    } else {
      res.send(data);
    }
  });
};

// แสดงรายละเอียดของการสั่งซื้อทั้งหมดในกลุ่ม order_id
exports.getOrderDetailsByOrderId = (req, res) => {
  console.log("GET By Order_id")
  const orderId = req.params.orderId;

  Order.getOrderDetailsByOrderId(orderId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `ไม่พบการสั่งซื้อใน order_id ${orderId}`
        });
      } else {
        res.status(500).send({
          message: `เกิดข้อผิดพลาดในการดึงข้อมูลการสั่งซื้อใน order_id ${orderId}`
        });
      }
    } else {
      res.send(data);
    }
  });
};