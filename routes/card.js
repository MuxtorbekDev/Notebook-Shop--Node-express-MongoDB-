const { Router } = require("express");
const Notebook = require("../models/notebook");
const router = Router();

// user items map
function mapCart(cart) {
  return cart.items.map((s) => ({
    ...s.notebookId._doc,
    id: s.notebookId._id,
    count: s.count,
  }));
}

// price function
function computerPrice(notebooks) {
  return notebooks.reduce((total, notebooks) => {
    return (total += notebooks.price * notebooks.count);
  }, 0);
}

router.post("/add", async (req, res) => {
  const notebook = await Notebook.findById(req.body.id);
  await req.user.addToCart(notebook);
  res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate("cart.items.notebookId");
  const notebooks = mapCart(user.cart);
  const cart = {
    notebooks,
    price: computerPrice(notebooks),
  };

  res.status(200).json(cart);
});

router.get("/", async (req, res) => {
  const user = await req.user.populate("cart.items.notebookId");
  // console.log(user.cart.items);
  const notebooks = mapCart(user.cart);

  res.render("cart", {
    title: "Basket",
    isCart: true,
    notebooks: notebooks,
    price: computerPrice(notebooks),
  });
});

module.exports = router;
