const { Router } = require("express");
const router = Router();
const Notebook = require("../models/notebook");
const auth = require("../middleware/auth");
const User = require("../middleware/user");

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

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const toChange = {
      name: teq.body.name,
    };

    console.log(req.file);
    if (req.file) {
      toChange.avatarUrl = "";
    }

    Object.assign(user, toChange);
    await user.save();
    res.redirect("/profile");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
