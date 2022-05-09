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
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Home Page", isHome: true });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page", isAbout: true });
});

app.get("/notebooks", (req, res) => {
  res.render("notebooks", { title: "Notebook Page", isNotebooks: true });
});

app.get("/add", (req, res) => {
  res.render("add", { title: "Add Page", isAdd: true });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
