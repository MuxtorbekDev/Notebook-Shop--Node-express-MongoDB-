const { Router } = require("express");
const Order = require("../models/orders");
const router = Router();

router.get("/", (req, res) => {
  try {
    res.render("orders", {
      isOrder: true,
      title: "Now Orders",
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.notebookId");
    const notebooks = user.cart.items.map((m) => ({
      count: m.count,
      notebook: { ...m.notebookId._doc },
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      notebooks,
    });

    await order.save();

    await req.user.cleanCart();
    res.redirect("/orders");
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
