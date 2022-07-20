const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Up = new Schema({


    nomup: String


});
module.exports = mongoose.model('ups', Up);

