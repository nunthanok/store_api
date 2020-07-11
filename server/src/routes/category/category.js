module.exports = (app) => {
  const category = require("../../controllers/category/category.js");

  //Insert Category
  app.post("/category", category.create);

  //Get all Categories
  app.get("/category", category.findAll);

  //Get category By ID
  app.get("/category/:categoryId", category.findOne);

  //Udate Category By Id
  app.put("/category/:categoryId", category.update);

  //Delete Category By Id
  app.delete("/category/:categoryId", category.delete);

  //Delete Category All
  app.delete("/category", category.deleteAll);
};
