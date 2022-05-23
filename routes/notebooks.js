const { Router } = require("express");
// const Card = require("../models/card");
const Notebook = require("../models/notebook");
const auth = require("../middleware/auth");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const notebooksData = await Notebook.find()
      .populate("userId", "email name")
      .select("price title img descr");
    const notebooksReverse = notebooksData.reverse();

    res.render("notebooks", {
      title: "Notebook Page",
      isNotebooks: true,
      userId: req.user ? req.user._id.toString() : null,
      notebooks: notebooksReverse,
    });
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  try {
    const { id } = req.params;
    const notebook = await Notebook.findById(id);
    if (notebook.userId.toString() !== req.user._id.toString()) {
      return res.redirect("/notebooks");
    }
    res.render("notebook-edit", {
      title: `Edit ${notebook.title}`,
      notebook,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/edit", auth, async (req, res) => {
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

router.post("/remove", auth, async (req, res) => {
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
