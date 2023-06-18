const sql = require("./db.js");

// constructor
const Order = function (order) {
  this.order_id = order.order_id
  this.order_Product_ID = order.order_Product_ID;
  this.order_Product_Quantity = order.order_Product_Quantity;
  this.order_Customer = order.order_Customer;
  this.order_Customer_Contact = order.order_Customer_Contact;
  this.order_Customer_Address = order.order_Customer_Address;
  this.order_Type_Delivery = order.order_Type_Delivery;
  this.order_Type_Pay = order.order_Type_Pay;
  this.order_Product_total_Price = order.order_Product_total_Price;
  this.order_Date = order.order_Date;
  this.order_User_ID = order.order_User_ID;
  this.order_Delivery_Status = order.order_Delivery_Status;
};

Order.nextorder = (result) => {
  sql.query("SELECT MAX(order_id) as orderid FROM orders", (err, res) => {
    console.log("ssssss", res[0].orderid)
    if (res[0].orderid == null || err) {
      console.log("kkkkk")
      result(null, 1);
    } else {
      console.log("hhh")
      result(null, res[0].orderid + 1);
    }

    // result(null, { id: res.insertId, ...newOrder });
  });
};

Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    sql.query(`UPDATE products set product_quantity = product_quantity${-newOrder.order_Product_Quantity} WHERE id = ${newOrder.order_Product_ID}`)
    console.log("created order: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};

Order.findById = (id, result) => {
  sql.query(`SELECT * FROM orders WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (order_Customer, result) => {
  let query = "SELECT products.product_name, orders.*  FROM orders JOIN products ON products.id = orders.order_Product_ID ";

  if (order_Customer) {
    query += ` WHERE orders.order_Customer LIKE '%${order_Customer}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Order.getAllPublished = result => {
  sql.query("SELECT * FROM orders WHERE order_Delivery_Status=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Order.updateById = (id, order, result) => {
  sql.query(
    "UPDATE orders SET order_id = ?, order_Customer = ?, order_Customer_Address = ?, order_Customer_Contact = ?, order_Product_ID = ?, order_Product_total_Price = ?, order_Product_Quantity = ?, order_Type_Delivery = ?, order_Type_Pay = ?, order_Delivery_Status = ?, order_User_ID = ?, order_Date = ? WHERE id = ?",
    [
      order.order_id,
      order.order_Customer,
      order.order_Customer_Address,
      order.order_Customer_Contact,
      order.order_Product_ID,
      order.order_Product_total_Price,
      order.order_Product_Quantity,
      order.order_Type_Delivery,
      order.order_Type_Pay,
      order.order_Delivery_Status,
      order.order_User_ID,
      order.order_Date,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order: ", { id: id, ...order });
      result(null, { id: id, ...order });
    }
  );
};

Order.remove = (id, result) => {
  sql.query("DELETE FROM orders WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Order with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order with id: ", id);
    result(null, res);
  });
};

Order.removeAll = result => {
  sql.query("DELETE FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

// ดึงข้อมูล order_id ทั้งหมด
Order.getAllOrderIds = (result) => {
  sql.query('SELECT DISTINCT order_id FROM orders', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('order_ids: ', res);
    result(null, res);
  });
};

// ดึงข้อมูลการสั่งซื้อทั้งหมดในกลุ่ม order_id
Order.getOrderDetailsByOrderId = (orderId, result) => {
  sql.query(
    'SELECT products.product_name, orders.*  FROM orders JOIN products ON products.id = orders.order_Product_ID WHERE orders.order_id = ?',
    orderId,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('order_details: ', res);
        result(null, res);
        return;
      }

      // ไม่พบการสั่งซื้อใน order_id ที่กำหนด
      result({ kind: 'not_found' }, null);
    }
  );
};

// Update the delivery status of an order
Order.updateDeliveryStatus = (orderId, deliveryStatus, result) => {
  sql.query(
    "UPDATE orders SET order_Delivery_Status = ? WHERE order_id = ?",
    [deliveryStatus, orderId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("updated order: ", { order_id: orderId, order_Delivery_Status: deliveryStatus });
      result(null, { order_id: orderId, order_Delivery_Status: deliveryStatus });
    }
  );
};



module.exports = Order;