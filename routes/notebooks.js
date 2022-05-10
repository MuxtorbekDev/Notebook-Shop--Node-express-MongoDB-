const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("notebooks", { title: "Notebook Page", isNotebooks: true });
});

module.exports = router;
