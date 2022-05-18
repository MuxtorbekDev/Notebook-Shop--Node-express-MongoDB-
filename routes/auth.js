const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

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
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    console.log(candidate);
    if (candidate) {
      const userPas = bcrypt.compare(password, candidate.password);
      if (userPas) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          console.log(err);
          if (err) throw err;
          res.redirect("/");
        });
      }
    } else {
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      res.redirect("/auth/login#register");
    } else {
      const hashPass = await bcrypt.hash(password, 12);
      console.log(hashPass);
      const user = new User({
        email: email,
        name: name,
        password: hashPass,
        cart: { items: [] },
      });

      await user.save();
      res.redirect("/auth/login#login");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
