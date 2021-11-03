const express = require('express');
const router = express.Router();
const User = require('../models/User');
var gravatar = require('gravatar');
const bcrypt = require("bcrypt");

// GET USERS
router.get('/', (req, res)=> {
    User.find({})
    .then((data) => res.json(data))
    .catch((err) => res.json({err: err}))
})

// REGISTER USER
router.post('/register', (req, res)=> {
    const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
    // check if email already exists
    User.findOne({email: req.body.email})
    .then((user) => {
        if (user) {
            return res.send("email already exists")
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: avatar,
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                    .then((user)=> res.json(user))
                    .catch((err)=> res.json(err))
                })
            })
        }
    })
    .catch((err) => res.send(err))
})

// USER LOGIN
router.post('/login', (req, res)=> {
    const { email, password} = req.body;
    // check if the user exists
    User.findOne({email: email})
    .then((user) => {
        if (!user) {
            return res.send("Email not found")
        }
        else {
            bcrypt.compare(password, user.password)
            .then((isMatch) => {
                if (isMatch)
                    res.send("Success");
                else
                    res.send("Password is incorrect")
            })
            .catch((err) => res.send(err))
        }
    })

})

module.exports = router