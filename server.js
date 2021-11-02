const express = require('express');
const mongoose = require('mongoose')
const app = express();
const db = require('./config/keys_dev').MONGO_URI;
const users = require('./routes/users')

const port = process.env.PORT || 5000

// Connect to MONGODB
mongoose.connect(db)
.then(()=> console.log("connected to Database"))
.catch((err)=> console.log(err))

// Routes
app.use('/api/v1/users', users)

app.listen(port, ()=> console.log(`server listening on port ${port}`))