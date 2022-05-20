const { Router } = require("express");
const router = Router();
const Notebook = require("../models/notebook");

router.get("/", async (req, res) => {
  const notebooks = await Notebook.find();
  const arrayMy = [];
  notebooks.forEach((item) => {
    if (item.userId.toString() === req.user._id.toString()) {
      arrayMy.push(item);
    }
  });

  res.render("profile", {
    title: `Profile ${req.user.name}`,
    isProfile: true,
    user: req.user.toObject(),
    cardItems: req.user.cart.items[0].count,
    myNotebooks: arrayMy.length,
  });
});
module.exports = router;
