const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const mongoose = require("mongoose");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");

const pas = `3vqzR5Jznwn7VRt7`;

// Create engine
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
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

async function start() {
  try {
    const url =
      "mongodb+srv://Muxtorbek:3vqzR5Jznwn7VRt7@cluster0.gsdaw.mongodb.net/NotebookShops";

    mongoose.connect(url, { useNewUrlParser: true });
    // PORT
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
}
start();
