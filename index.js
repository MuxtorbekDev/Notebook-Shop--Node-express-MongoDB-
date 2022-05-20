const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const app = express();
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const mongoose = require("mongoose");
const session = require("express-session");
const homeRoutes = require("./routes/home");
const aboutRoutes = require("./routes/about");
const notebooksRoutes = require("./routes/notebooks");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const ordersRoutes = require("./routes/orders");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const varMiddleware = require("./middleware/var");
const userMiddleware = require("./middleware/user");
const errorPage = require("./middleware/error");

const MongoStore = require("connect-mongodb-session")(session);

// const pas = `3vqzR5Jznwn7VRt7`;

const MONGODB_URI =
  "mongodb+srv://Muxtorbek:3vqzR5Jznwn7VRt7@cluster0.gsdaw.mongodb.net/NotebookShops";

// Create engine
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: require("./utils/index"),
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("hbs", hbs.engine);

const store = new MongoStore({
  collection: "session",
  uri: MONGODB_URI,
});

// app use
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my secret variable",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(flash());

// Middleware
app.use(varMiddleware);
app.use(userMiddleware);

// Routes
app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/about", aboutRoutes);
app.use("/card", cardRoutes);
app.use("/orders", ordersRoutes);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

// Error Page
app.use(errorPage);
// app.get("*/*", (req, res) => {
//   res.render("404Error");
// });

// Listen
async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

    // Candidate
    // const candidate = await User.findOne();

    // if (!candidate) {
    //   const user = new User({
    //     email: "muxtor@gmail.com",
    //     name: "Muxtorbek",
    //     cart: { items: [] },
    //   });
    //   await user.save();
    // }

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
