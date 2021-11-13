const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys_dev").MONGO_URI;
const cors = require("cors");
const users = require("./routes/users");
const products = require("./routes/products");
const cart = require("./routes/cart");
const order = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const passport = require("passport");

const port = process.env.PORT || 5000;

// Connect to MONGODB
mongoose
  .connect(db)
  .then(() => console.log("connected to Database"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

require("./config/passport")(passport);

// Routes
app.use("/api/v1/users", users);
app.use("/api/v1/products", products);
app.use("/api/v1/cart", cart);
app.use("/api/v1/order", order);
app.use("/api/v1/checkout", stripeRoute);

app.listen(port, () => console.log(`server listening on port ${port}`));
