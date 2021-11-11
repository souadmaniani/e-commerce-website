const Cart = require("../models/Cart");
const User = require("../models/User");
const router = require("express").Router();

// FIND ALL CARTS
router.get("/all", (req, user) => {
  Cart.find({})
    .then((carts) => res.json(carts))
    .catch((err) => err);
});

// FIND CART BY USER
router.get("/:userId", (req, res) => {
  Cart.find({ _id: req.params.userId })
    .then((cart) => res.json(cart))
    .catch((err) => err);
});

// CREATE NEW CART
router.post("/", (req, res) => {
  const cartFields = {};
  
  cartFields.user = req.user.id;
  cartFields.products = req.products;
  cartFields.total = req.total;
  User.findById({ _id: req.user.id }).then((user) => {
    if (user) {
      // UPDATE CART
      Cart.findOneAndUpdate(
        { user: req.user.id },
        { $set: cartFields },
        { new: true }
      )
        .then((cart) => res.json(cart))
        .catch((err) => res.json(err));
    } else {
      // CREATE NEW CART
      new Cart(cartFields)
        .save()
        .then((cart) => res.json(cart))
        .catch((err) => res.json(err));
    }
  });
});
