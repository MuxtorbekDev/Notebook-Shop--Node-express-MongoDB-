const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Register",
    isLogin: true,
  });
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/auth/login#login");
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findById("627f237c8892a647805e43e0");
  req.session.user = user;
  req.session.isAuthenticated = true;
  req.session.save((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
