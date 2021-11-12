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

// CREATE NEW CART
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

module.exports = router;
