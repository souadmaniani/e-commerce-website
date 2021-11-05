const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET ALL PRODUCTS
router.get("/", (req, res) => {
  Product.find({})
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

// GET PRODUCTS BY CATEGORY
router.get("/:category", (req, res) => {
  Product.find({ category: req.params.category })
    .then((products) => res.json(products))
    .catch((err) => res.json(err));
});

// GET PRODUCTS BY ID
router.get("/:id", (req, res) => {
  Product.findById({ _id: req.params.id })
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

// CREATE PRODUCT
router.post("/", (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
  });
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

// ADD COLOR FOR A PRODUCT
router.post("/:productId", (req, res) => {
  Product.findById({ _id: req.params.productId }).then((product) => {
    const newColor = {
      stock: req.body.stock,
      image: req.body.image,
      images: req.body.images,
      color: req.body.color,
    };
    product.colors.unshift(newColor);
    product
      .save()
      .then((product) => res.json(product))
      .catch((err) => res.json(err));
  });
});
