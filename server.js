const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys_dev").MONGO_URI;
const cors = require("cors");
const users = require("./routes/users");
const variants = require("./routes/variants");
const products = require("./routes/products");
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
app.use("/api/v1/products/variants", variants);
app.use("/api/v1/products", products);
app.use("/api/v1/checkout", stripeRoute);

app.listen(port, () => console.log(`server listening on port ${port}`));
