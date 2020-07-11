const sql = require("../db.js");

// Constructor
const Product = function (products) {
  this.pro_id = products.pro_id;
  this.pro_name = products.pro_name;
  this.pro_price = products.pro_price;
  this.cate_id = products.cate_id;
};

//Create new products
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ? ", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created products", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

//Get all products
Product.getAll = (result) => {
  sql.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("product: ", res);
    result(null, res);
  });
};

//find a Producrts by id
Product.findById = (productId, result) => {
  sql.query(
    `SELECT * FROM products WHERE pro_id = ${productId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found customer: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

//update Products by id
Product.updateById = (id, products, result) => {
  sql.query(
    "UPDATE products SET  pro_name = ?, pro_price = ?, cate_id = ? WHERE pro_id = ?",
    [products.pro_name, products.pro_price, products.cate_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...products });
      result(null, { id: id, ...products });
    }
  );
};

//remove a Products
Product.remove = (id, result) => {
  sql.query("DELETE FROM products WHERE pro_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Products with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted products with id: ", id);
    result(null, res);
  });
};

//remove all Customers
Product.removeAll = (result) => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Product;
