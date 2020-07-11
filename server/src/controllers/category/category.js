const Category = require("../../models/category/category.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  //Create Category
  const category = new Category({
    cate_name: req.body.cate_name,
    cate_group: req.body.cate_group,
  });

  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving category.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.productId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving with id " + req.params.categoryId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);

  Category.updateById(
    req.params.categoryId,
    new Category(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found category with id ${req.params.categoryId}`,
          });
        } else {
          res.status(500).send({
            message: "Error updating category with id " + req.params.categoryId,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Category.remove(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.categoryId}`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Category with" + req.params.categoryId,
        });
      }
    } else res.send({ message: "Delete Category Successfully!" });
  });
};

exports.deleteAll = (req, res) => {
  Category.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all category",
      });
    } else res.send({ message: "All category were deleted successfully!" });
  });
};
