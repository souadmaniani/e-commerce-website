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
// .populate("user", ["name", "avatar"])
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
  const errors = {};
  Product.findById({ _id: req.params.productId })
    .then((product) => {
      if (!product) {
        errors.noproduct = `There is no product with id: ${req.params.productId}`;
        res.status(404).json(errors);
      } else {
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

// Person.update({'items.id': 2}, {'$set': {
//   'items.$.name': 'updated item2',
//   'items.$.value': 'two updated'

// UPDATE PRODUCT
// upsert means an update that inserts a new document if no document matches the filter
router.put("/:productId", (req, res) => {
  const errors = {};
  errors.noproduct = `There is no product with id: ${req.params.productId}`;
  const filter = { _id: req.params.productId };
  const update = req.body;

  Product.findById(req.params.productId)
    .then((product) => {
      if (!product) return res.status(404).json(errors);
      product
        .updateOne(filter, update, { new: true })
        .then((product) => res.json(product))
        .catch((err) => res.json(err));
    })
    .catch(() => res.status(404).json(errors));
});

module.exports = router;

// Create new Product
// {
//   "title": "hot jacket",
//   "description": "hot jacket",
//   "price": 90,
//   "category": "jacket",
//   "vars": [
//           { "varId": "61884cb53d27cef4192aceb7", "values":
//               [
//                   { "value": "red", "images": [{ "src": "img11", "isMain": true}, { "src": "img12"}] },
//                   { "value": "green", "images": [{ "src": "img21", "isMain": true}, { "src": "img22"}] },
//                   { "value": "gray", "images": [{ "src": "img31", "isMain": true}, { "src": "img32"}] }
//               ]
//           }
//       ]
// }
