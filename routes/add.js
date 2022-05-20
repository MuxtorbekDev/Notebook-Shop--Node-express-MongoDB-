const { Router } = require("express");
const Notebook = require("../models/notebook");
const { validationResult } = require("express-validator");
const { notebookValidators } = require("../utils/validators");
const router = Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  res.render("add", { title: "Add Notebook", isAdd: true });
});

router.post("/", auth, notebookValidators, async (req, res) => {
  const errors = validationResult(req);
  const { title, price, img, descr } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).render("add", {
      title: "Add Notebook",
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title,
        price,
        img,
        descr,
      },
    });
  }

  const notebook = new Notebook({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    descr: req.body.descr,
    userId: req.user,
  });

  try {
    await notebook.save();
    res.redirect("/notebooks");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
