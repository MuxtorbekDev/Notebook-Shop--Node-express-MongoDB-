const { Router } = require("express");
const router = Router();
const Notebook = require("../models/notebook");
const auth = require("../middleware/auth");
const User = require("../models/user");

router.get("/", async (req, res) => {
  const notebooks = await Notebook.find();
  const arrayMy = [];
  notebooks.forEach((item) => {
    if (item.userId.toString() === req.user._id.toString()) {
      arrayMy.push(item);
    }
  });

  let count = 0;
  if (req.user.cart.items.length == 0) {
    count = 0;
  } else {
    count = req.user.cart.items[0].count;
  }

  res.render("profile", {
    title: `Profile ${req.user.name}`,
    isProfile: true,
    user: req.user.toObject(),
    cardItems: count,
    myNotebooks: arrayMy.length,
  });
});

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const toChange = {
      name: req.body.name,
    };

    if (req.file) {
      toChange.avatarUrl = req.file.path;
    }

    Object.assign(user, toChange);
    await user.save();
    res.redirect("/profile");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
