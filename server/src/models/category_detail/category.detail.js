const sql = require("../db.js");

// Constructor
const CategoryDetail = function (category_detail) {
  this.cate_id = category_detail.cate_id;
  this.cate_de_name = category_detail.cate_de_name;
  this.cate_de_group = category_detail.cate_de_group;
};

CategoryDetail.create = (newCategoryDetail, result) => {
  sql.query(
    "INSERT INTO categories_detail SET ? ",
    newCategoryDetail,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created category detail ", {
        id: res.insertId,
        ...newCategoryDetail,
      });
      result(null, { id: res.insertId, ...newCategoryDetail });
    }
  );
};

CategoryDetail.getAll = (result) => {
  sql.query("SELECT * FROM categories_detail", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    console.log("category detail: ", res);
    result(null, res);
  });
};

CategoryDetail.findById = (categoryDetailId, result) => {
  sql.query(
    `SELECT * FROM categories_detail WHERE cate_de_id = ${categoryDetailId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found category detail: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

//update Products by id
CategoryDetail.updateById = (id, category_detail, result) => {
  sql.query(
    "UPDATE categories_detail SET  cate_id = ?, cate_de_name = ?, cate_de_group = ? WHERE cate_de_id = ?",
    [
      category_detail.cate_id,
      category_detail.cate_de_name,
      category_detail.cate_de_group,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found  with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated category detail: ", { id: id, ...category_detail });
      result(null, { id: id, ...category_detail });
    }
  );
};

CategoryDetail.remove = (id, result) => {
  sql.query(
    "DELETE FROM categories_detail WHERE cate_de_id = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found  with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted category detail with id: ", id);
      result(null, res);
    }
  );
};

CategoryDetail.removeAll = (result) => {
  sql.query("DELETE FROM categories_detail", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} category detail`);
    result(null, res);
  });
};

module.exports = CategoryDetail;
