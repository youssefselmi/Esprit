const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Module = new Schema({


    nommodule: String,
    coefficient: Number,
    nbrheures: Number,
    attribut: String,
    nomup: String,
    nomcompetence :[{
        type:String
    }],



});
module.exports = mongoose.model('modules', Module);

