const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");

// PORT
const PORT = process.env.PORT || 5000;

// Create engine
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
app.engine("hbs", hbs.engine);

// app use
app.set("view engine", "hbs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
