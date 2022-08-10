const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Type = new Schema({


    typeenseignement:String,
    nbreheures:Number,


});
module.exports = mongoose.model('types', Type);

