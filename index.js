const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");

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
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/about", aboutRoutes);
app.use("/card", cardRoutes);

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
