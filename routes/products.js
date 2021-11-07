const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  Product.find({})
    .sort({ date: -1 })
    .limit(12)
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

// CREATE PRODUCT
router.post("/", (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    vars: req.body.vars,
  });
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

// GET PRODUCT BY ID
router.get("/:productId", (req, res) => {
  Product.findById({ _id: req.params.productId })
    .then((product) => res.json(product))
    .catch(() =>
      res.status(404).json({
        noproduct: `There is no product with id: ${req.params.productId}`,
      })
    );
});

// GET PRODUCTS BY CATEGORY
router.get("/category/:category", (req, res) => {
  Product.find({ "category.name": req.params.category })
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

// DELETE SINGLE PRODUCT
router.delete("/:productId", (req, res) => {
  Product.findById({ _id: req.params.productId })
    .then((product) => {
      if (!product)
        res.status(404).json({
          noproduct: `There is no product with id: ${req.params.productId}`,
        });
      else {
        Product.deleteOne({ _id: req.params.productId })
          .then(() => res.json({ success: "Product successfully deleted" }))
          .catch(() =>
            res.status(404).json({
              noproduct: `There is no product with id: ${req.params.productId}`,
            })
          );
      }
    })
    .catch((err) => res.json(err));
});


module.exports = router;
