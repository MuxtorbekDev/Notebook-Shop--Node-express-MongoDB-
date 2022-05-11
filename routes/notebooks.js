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

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const { id } = req.params;
  const notebook = await Notebook.getById(id);
  res.render("notebook-edit", { title: `Edit ${notebook.title}`, notebook });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const notebook = await Notebook.getById(id);

  res.render("notebook", {
    layout: "detail",
    title: `${notebook.title} Notebook`,
    notebook,
  });
});

module.exports = router;
