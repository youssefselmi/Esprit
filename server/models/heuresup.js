const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Heuresup = new Schema({


    idenseignant:String,
    nomenseignant: String,
   
    periodes :[{
        type:String
    }],
    nbreheures:Number,


});
module.exports = mongoose.model('heuresups', Heuresup);

