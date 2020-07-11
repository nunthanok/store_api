module.exports = (app) => {
  const categoryDetail = require("../../controllers/category_detail/category_detail.js");

  app.post("/category-detail", categoryDetail.create);

  app.get("/category-detail", categoryDetail.findAll);

  app.get("/category-detail/:categoryDetailId", categoryDetail.findOne);

  app.put("/category-detail/:categoryDetailId", categoryDetail.update);

  app.delete("/category-detail/:categoryDetailId", categoryDetail.delete);

  app.delete("/category-detail", categoryDetail.deleteAll);
};
