// const express = require('express');
// const mongoose = require('mongoose')
// const app = express();
// const db = require('./config/keys_dev').MONGO_URI;
// const users = require('./routes/users')

// const port = process.env.PORT || 5000

// // Connect to MONGODB
// mongoose.connect(db)
// .then(()=> console.log("connected to Database"))
// .catch((err)=> console.log(err))

// // Routes
// app.use('/api/v1/users', users)

// app.listen(port, ()=> console.log(`server listening on port ${port}`))

const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51JrKmtAbmPqrOAcgCPCFnejITMlMwwviLqE6ydGX6SYMJiQYBKLsGSxbgcDcvdZfZoxA0YoWIjlp0z46AZbbKR4V00DUIyRABZ");
// const uuid = require("uuid/v4");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    // const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
    //   {
    //     idempotency_key
    //   }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

app.listen(5000);
