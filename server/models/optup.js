const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Optup = new Schema({


    idenseignant: String,
    
    nomenseignant: String,
    up: String,
    
    creneaux: Number,
    periode:String



});
module.exports = mongoose.model('optups', Optup);

