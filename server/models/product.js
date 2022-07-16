const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Product = new Schema({
    productName: String,
    category: String,
    date: Date,
    freshness: String,
    price: Number,
    comment: String,

    
});
module.exports = mongoose.model('produits', Product);

