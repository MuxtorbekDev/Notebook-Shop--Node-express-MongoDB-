const { Router } = require("express");
const Card = require("../models/card");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", async (req, res) => {
  const notebooks = await Notebook.getAll();

  // Basket count
  const card = await Card.fetch();
  let fullItemCount = 0;
  card.notebooks.forEach((item) => {
    const notebookCount = item.count;
    fullItemCount += +notebookCount;
  });

  res.render("notebooks", {
    title: "Notebook Page",
    isNotebooks: true,
    notebooks,
    fullItemCount,
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

router.post("/edit", async (req, res) => {
  await Notebook.update(req.body);
  res.redirect("/notebooks");
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
