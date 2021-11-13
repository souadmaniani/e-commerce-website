const express = require("express");
const passport = require("passport");
const Cart = require("../models/Cart");
const User = require("../models/User");
const router = express.Router();

// FIND ALL CARTS
router.get("/all", (req, res) => {
  const errors = {};
  errors.nocartfound = "no cart found";
  Cart.find({})
    .sort({ date: -1 })
    .limit(12)
    .then((carts) => {
      if (carts.length === 0) return res.json(errors);
      res.json(carts);
    })
    .catch((err) => err);
});

// FIND CART BY USER
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cart.find({ _id: req.params.userId })
      .then((cart) => res.json(cart))
      .catch((err) => err);
  }
);

// ADD PRODUCT TO CART
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Cart.findOne({ user: req.user.id })
      .populate("user", ["name"], "products", ["title"])
      .then((cart) => {
        if (!cart) {
          new Cart({ user: req.user.id, products: [], total: 0 })
            .save()
            .then((cart) => res.json(cart))
            .catch((err) => res.json(err));
        } else {
          cart.user = req.user.id;
          let index;
          cart.total = req.body.total;
          if (
            (index = cart.products.map(e => e.productId).indexOf(req.body.product.productId)) !== -1
          ) {
            cart.products[index].quantity = req.body.product.quantity;
          } else {
            cart.products.unshift(req.body.product);
          }
          cart
            .save()
            .then((cart) => res.json(cart))
            .catch((err) => res.json(err));
        }
      });
  }
);

module.exports = router;
