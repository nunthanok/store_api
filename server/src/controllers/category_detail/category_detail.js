const CategoryDetail = require("../../models/category_detail/category.detail.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const categoryDetail = new CategoryDetail({
    cate_id: req.body.cate_id,
    cate_de_name: req.body.cate_de_name,
    cate_de_group: req.body.cate_de_group,
  });

  // Save Customer in the database
  CategoryDetail.create(categoryDetail, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the category detail.",
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  CategoryDetail.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving category.",
      });
    else res.send(data);
  });
};

// Find a single products with a productId
exports.findOne = (req, res) => {
  CategoryDetail.findById(req.params.categoryDetailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.categoryDetailId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Category detail with id " +
            req.params.categoryDetailId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  CategoryDetail.updateById(
    req.params.categoryDetailId,
    new CategoryDetail(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found category detail with id ${req.params.categoryDetailId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating category detail with id " +
              req.params.categoryDetailId,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  CategoryDetail.remove(req.params.categoryDetailId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category detail with id ${req.params.categoryDetailId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Category detail with id " +
            req.params.categoryDetailId,
        });
      }
    } else res.send({ message: `Category detail was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  CategoryDetail.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all category detail.",
      });
    else res.send({ message: `All products were deleted successfully!` });
  });
};
