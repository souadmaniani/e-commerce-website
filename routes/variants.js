const express = require("express");
const router = express.Router();

const Variants = require("../models/Variants");

// GET VARIANTS
router.get("/", (req, res) => {
  Variants.find({})
    .then((variants) => res.json(variants))
    .catch((err) => res.json(err));
});

// CREATE VARIANT
router.post("/", (req, res) => {
  const newVariant = new Variants({
    name: req.body.name,
  });
  newVariant
    .save()
    .then((variant) => res.json(variant))
    .catch((err) => res.json(err));
});

module.exports = router;
