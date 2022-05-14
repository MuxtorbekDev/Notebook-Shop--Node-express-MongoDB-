const { Router } = require("express");
// const Card = require("../models/card");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", async (req, res) => {
  const notebooks = await Notebook.find()
    .populate("userId", "email name")
    .select("price title img descr");

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
  const notebook = await Notebook.findById(id);
  res.render("notebook-edit", { title: `Edit ${notebook.title}`, notebook });
});

router.post("/edit", async (req, res) => {
  const { body } = req;
  await Notebook.findByIdAndUpdate(body.id, body);
  res.redirect("/notebooks");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const notebook = await Notebook.findById(id);

  res.render("notebook", {
    layout: "detail",
    title: `${notebook.title} Notebook`,
    notebook,
  });
});

router.post("/remove", async (req, res) => {
  try {
    await Notebook.deleteOne({ _id: req.body.id });
    res.redirect("/notebooks");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

// // Basket count
// const card = await Card.fetch();
// let fullItemCount = 0;
// card.notebooks.forEach((item) => {
//   const notebookCount = item.count;
//   fullItemCount += +notebookCount;
// });
