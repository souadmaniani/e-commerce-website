
const mongoose = require('mongoose');
const {model, Schema} = mongoose;

// product has multiple colors && sizes && images
const ProductSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    Category: {
        type: String
    },
    stock: {
        type: Number
    },
    image: {
        type: String
    },
    images: {
        type: Array[String]
    },
    color: {
        type: String
    },

})