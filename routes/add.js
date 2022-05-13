const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", { title: "Add Page", isAdd: true });
});

router.post("/", async (req, res) => {
  const notebook = new Notebook({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    descr: req.body.descr,
  });

  try {
    await notebook.save();
    res.redirect("/notebooks");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
