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
    _userId:{
        type:mongoose.Types.ObjectId,
        required: true
    }



});
module.exports = mongoose.model('modules', Module);

