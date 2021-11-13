const Order = require("../models/Order");
const router = require("express").Router();
const passport = require("passport");

// FIND ALL ORDERS
router.get("/all", (req, res) => {
  const errors = {};
  errors.noorderfound = "no order found";
  Order.find({})
    .sort({ date: -1 })
    .limit(12)
    .then((orders) => {
      if (orders.length === 0) return res.json(errors);
      res.json(orders);
    })
    .catch((err) => err);
});

// FIND ORDER BY USER
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.find({ _id: req.params.userId })
      .then((order) => res.json(order))
      .catch((err) => err);
  }
);
// CREATE ORDER
router.post("/", (req, res) => {
  new Order(req.body)
    .save()
    .then((order) => res.json(order))
    .catch((err) => res.json(err));
});

// UPDATE ORDER
router.put("/:orderId", (req, res) => {
  Order.findOneAndUpdate(
    { _id: req.params.orderId },
    { $set: req.body },
    { new: true }
  )
    .then((order) => res.json(order))
    .catch((err) => res.json(err));
});

module.exports = router;
