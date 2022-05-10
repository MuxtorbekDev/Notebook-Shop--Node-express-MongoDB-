const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", async (req, res) => {
  const notebooks = await Notebook.getAll();

  res.render("notebooks", {
    title: "Notebook Page",
    isNotebooks: true,
    notebooks,
  });
});

module.exports = router;
