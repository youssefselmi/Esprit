const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Up = new Schema({


    nomup: String,
    nomdepartement: String,



});
module.exports = mongoose.model('ups', Up);

