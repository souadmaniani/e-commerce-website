const router = require("express").Router();
const stripeKey = require('../config/keys_dev').STRIPE_KEY;
const stripe = require("stripe")(stripeKey);

router.post("/", (req, res) => {
  const { product, stripeToken } = req.body; 
console.log("stripeToken: ", stripeToken);
  stripe.charges.create(
    {
      source: stripeToken.id,
      amount: product.price * 100,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;