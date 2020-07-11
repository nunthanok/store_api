const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.json({ message: "Welcome to store API" });
});

require("./src/routes/product/product.js")(app);
require("./src/routes/category/category.js")(app);
require("../server/src/routes/category_detail/category_detail.js")(app);

let port = 3000;
app.listen(port, function (req, res) {
  console.log("Server running on " + port);
});
