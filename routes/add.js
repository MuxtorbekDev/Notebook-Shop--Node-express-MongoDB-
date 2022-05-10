const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

router.get("/", (req, res) => {
  res.render("add", { title: "Add Page", isAdd: true });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const notebook = new Notebook(req.body.title, req.body.price, req.body.img);
  await notebook.save();
  res.redirect("/notebooks");
});

module.exports = router;
