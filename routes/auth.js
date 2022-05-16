const { Router } = require("express");
const router = Router();

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
  req.session.isAuthenticated = true;
  res.redirect("/");
});

module.exports = router;
