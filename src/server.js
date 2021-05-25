const express = require("express");
const routes = require("./routes");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.listen(3333, () => {
  console.log("Server Started at http://localhost:3333");
});
