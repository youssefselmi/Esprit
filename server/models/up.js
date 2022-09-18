const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Up = new Schema({


    nomup: String,
    nomdepartement: String,
    _userId:{
        type:mongoose.Types.ObjectId,
        required: true
    }



});
module.exports = mongoose.model('ups', Up);

