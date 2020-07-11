module.exports = (app) => {
  const products = require("../../controllers/product/product.js");

  //Create new products
  app.post("/products", products.create);

  //Get all product
  app.get("/products", products.findAll);

  //Get product by ID
  app.get("/products/:productId", products.findOne);

  //Update product
  app.put("/products/:productId", products.update);

  //Delet products
  app.delete("/products/:productId", products.delete);

  //Delete all products
  app.delete("/products", products.deleteAll);
};
