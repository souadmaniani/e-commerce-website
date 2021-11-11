const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const ValidateProductInput = require('../validation/product')

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  const errors = {};
  errors.noproduct = `no products found`;
  Product.find({})
    .sort({ date: -1 })
    .limit(12)
    .then((products) => {
      if (products.length === 0) return res.json(errors);
      res.json(products);
    })
    .catch((err) => res.json(err));
});

// CREATE PRODUCT
router.post("/", (req, res) => {
  const { errors, isValid } = ValidateProductInput(req.body);
  if (!isValid) return res.json(errors);
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    images: req.body.images,
    quantity: req.body.quantity,
    price: req.body.price,
  });
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

// GET PRODUCT BY ID
router.get("/:productId", (req, res) => {
  const errors = {};
  errors.noproduct = `There is no product with id: ${req.params.productId}`;
  Product.findById({ _id: req.params.productId })
    .then((product) => {
      if (!product) return res.json(errors);
      res.json(product);
    })
    .catch(() => res.status(404).json(errors));
});

// GET PRODUCTS BY CATEGORY
router.get("/category/:category", (req, res) => {
  const errors = {};
  errors.noproduct = `There is no product in ${req.params.category} category`;
  Product.find({ category: req.params.category })
    .then((products) => {
      if (products.length === 0) return res.json(errors);
      res.json(products);
    })
    .catch((err) => res.json(err));
});

// DELETE SINGLE PRODUCT
router.delete("/:productId", (req, res) => {
  const errors = {};
  errors.noproduct = `There is no product with id: ${req.params.productId}`;
  Product.findById({ _id: req.params.productId })
    .then((product) => {
      if (!product) {
        errors.noproduct = `There is no product with id: ${req.params.productId}`;
        res.status(404).json(errors);
      } else {
        Product.deleteOne({ _id: req.params.productId })
          .then(() => res.json({ success: "Product successfully deleted" }))
          .catch(() => res.status(404).json(errors));
      }
    })
    .catch(() => res.json(errors));
});

// UPDATE PRODUCT
router.put("/:productId", (req, res) => {
  const { errors, isValid } = ValidateProductInput(req.body);
  if (!isValid) return res.json(errors);
  errors.noproduct = `There is no product with id: ${req.params.productId}`;
  const productFields = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    images: req.body.images,
    quantity: req.body.quantity,
    price: req.body.price,
  };
  Product.findOneAndUpdate(
    { _id: req.params.productId },
    { $set: productFields },
    { new: true }
  )
    .then((product) => {
      if (!product) return res.json(errors);
      res.json(product);
    })
    .catch(() => res.json(errors));
});

module.exports = router;
