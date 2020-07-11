const sql = require("../db.js");

// Constructor
const Category = function (category) {
  // this.cate_id = category.cate_id;
  this.cate_name = category.cate_name;
  this.cate_group = category.cate_group;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Categories", { id: res.insertId, ...newCategory });
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.getAll = (result) => {
  sql.query(
    "select * from categories c WHERE cate_group = 'spec' ",
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      console.log("product: ", res);
      result(null, res);
    }
  );
};

Category.findById = (categoryId, result) => {
  sql.query(
    `SELECT * FROM categories WHERE cate_id = ${categoryId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found category: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE categories SET cate_name = ?, cate_group = ? WHERE cate_id = ?",
    [category.cate_name, category.cate_group, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated Category: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM categories WHERE cate_id = ? ", id, (err, res) => {
    if (err) {
      console.log("err: ", err);
      result(null, err);
      return;
    }
    if (res.effectedRow == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted category with id: ", id);
    result(null, res);
  });
};

Category.removeAll = (result) => {
  sql.query("DELETE FROM categories", (err, res) => {
    if (err) {
      console.log("err: ", err);
      result(null, res);
      return;
    }
    console.log(`Deleted ${res.effectedRow} Categories`);
    result(null, res);
  });
};

module.exports = Category;
